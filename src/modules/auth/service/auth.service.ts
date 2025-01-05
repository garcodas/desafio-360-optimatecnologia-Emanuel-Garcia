import * as bcrypt from "bcrypt";
import { CreateClientDto } from "../../client/dto/create-client.dto";
import { RoleService } from "../../role/service/role.service";
import { RegisterUserDto } from "../dto/register-user.dto";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";
import UserSessionService from "../../userSession/service/user-session.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import sequelize from "../../../config/database";
import { QueryTypes } from "sequelize";
import { User } from "../../../types/User";
import { InsertType } from "../../../types/InsertType";

export class AuthService {
  private roleService = new RoleService();
  private userSessionService = new UserSessionService();

  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      const existingUser = await sequelize.query<User>(
        "SELECT * FROM [User] WHERE Email = :Email AND Phone = :Phone",
        {
          replacements: {
            Email: registerUserDto.Email,
            Phone: registerUserDto.Phone,
          },
          type: QueryTypes.SELECT,
        }
      );

      if (existingUser.length > 0) {
        throw new Error("Ya existe un usuario con estas credenciales");
      }

      const role = await this.roleService.getRoleByName("Cliente");

      if (!role) {
        throw new Error("Ocurrio un error al buscar el rol");
      }

      const newUser = await sequelize.query<InsertType>(
        `EXEC InsertUser
          @Email = :Email, 
          @FullName = :FullName, 
          @PasswordHash = :PasswordHash, 
          @Phone = :Phone, 
          @BirthDate = :BirthDate, 
          @RoleId = :RoleId, 
          @StatusId = :StatusId`,
        {
          replacements: {
            FullName: registerUserDto.FullName,
            Email: registerUserDto.Email,
            Phone: registerUserDto.Phone,
            PasswordHash: await bcrypt.hash(registerUserDto.Password, 10),
            BirthDate: dayjs(registerUserDto.BirthDate).format("YYYY-MM-DD"),
            RoleId: role.Id,
            StatusId: 1,
          },
          type: QueryTypes.SELECT,
        }
      );

      return {
        Id: newUser[0].InsertedId,
        FullName: registerUserDto.FullName,
        Email: registerUserDto.Email,
        Phone: registerUserDto.Phone,
        BirthDate: registerUserDto.BirthDate,
      };
    } catch (error: any) {
      throw new Error("Error saving user" + error.message);
    }
  }

  async registerAdminUser(registerUserDto: RegisterUserDto) {
    try {
      const existingUser = await sequelize.query<User>(
        "SELECT * FROM [User] WHERE Email = :Email AND Phone = :Phone",
        {
          replacements: {
            Email: registerUserDto.Email,
            Phone: registerUserDto.Phone,
          },
          type: QueryTypes.SELECT,
        }
      );

      if (existingUser.length > 0) {
        throw new Error("Ya existe un usuario con estas credenciales");
      }

      const role = await this.roleService.getRoleByName("Administrador");

      if (!role) {
        throw new Error("Ocurrio un error al buscar el rol");
      }

      const newUser = await sequelize.query<InsertType>(
        `EXEC InsertUser
          @Email = :Email, 
          @FullName = :FullName, 
          @PasswordHash = :PasswordHash, 
          @Phone = :Phone, 
          @BirthDate = :BirthDate, 
          @RoleId = :RoleId, 
          @StatusId = :StatusId`,
        {
          replacements: {
            FullName: registerUserDto.FullName,
            Email: registerUserDto.Email,
            Phone: registerUserDto.Phone,
            PasswordHash: await bcrypt.hash(registerUserDto.Password, 10),
            BirthDate: dayjs(registerUserDto.BirthDate).format("YYYY-MM-DD"),
            RoleId: role.Id,
            StatusId: 1,
          },
          type: QueryTypes.SELECT,
        }
      );

      return {
        Id: newUser[0].InsertedId,
        FullName: registerUserDto.FullName,
        Email: registerUserDto.Email,
        Phone: registerUserDto.Phone,
        BirthDate: registerUserDto.BirthDate,
      };
    } catch (error: any) {
      throw new Error("Error saving user" + error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await sequelize.query<User>(
        "SELECT * FROM [User] WHERE Email = :Email AND StatusId = 1",
        {
          replacements: {
            Email: email,
          },
          type: QueryTypes.SELECT,
        }
      );

      if (user.length === 0 || user[0].StatusId === 2) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const isValid = await bcrypt.compare(
        password,
        user[0].PasswordHash ?? ""
      );
      if (!isValid) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const token = jwt.sign(
        {
          id: user[0].Id,
          email: user[0].Email,
        },
        envs.JWT_SECRET,
        {
          expiresIn: envs.JWT_EXPIRES_IN,
        }
      );

      await this.userSessionService.createUserSession({
        Token: token,
        UserId: user[0].Id ?? 0,
        ExpiresAt: dayjs().add(1, "day").toDate().toISOString(),
      });

      return {
        User: {
          Id: user[0].Id,
          Token: token,
          FullName: user[0].FullName,
          Email: user[0].Email,
          Phone: user[0].Phone,
          BirthDate: dayjs(user[0].BirthDate)
            .add(1, "day")
            .format("YYYY-MM-DD"),
          RoleId: user[0].RoleId,
        },
      };
    } catch (error: any) {
      throw new Error("Error loging user" + error.message);
    }
  }

  async logout(token: string) {
    try {
      await this.userSessionService.deleteUserSession(token);
    } catch (error: any) {
      throw new Error("Error loging out user" + error.message);
    }
  }

  async getUserByToken(token: string) {
    try {
      const userSession = await this.userSessionService.getUserSessionByToken(
        token
      );

      if (!userSession) {
        throw new Error("Usuario no encontrado");
      }

      const user = await sequelize.query<User>(
        "SELECT * FROM [User] WHERE Id = :Id",
        {
          replacements: {
            Id: userSession.UserId,
          },
          type: QueryTypes.SELECT,
        }
      );

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return {
        FullName: user[0].FullName,
        Email: user[0].Email,
        Phone: user[0].Phone,
        BirthDate: dayjs(user[0].BirthDate).format("YYYY-MM-DD"),
      };
    } catch (error: any) {
      throw new Error("Error getting user" + error.message);
    }
  }

  // async getUserById(id: number) {
  //   try {
  //     const user = await User.findByPk(id);

  //     if (!user) {
  //       throw new Error("Usuario no encontrado");
  //     }

  //     return {
  //       FullName: user.FullName,
  //       Email: user.Email,
  //       Phone: user.Phone,
  //       BirthDate: dayjs(user.BirthDate).add(1, "day").format("YYYY-MM-DD"),
  //     };
  //   } catch (error: any) {
  //     throw new Error("Error getting user" + error.message);
  //   }
  // }

  // async updateUser(id: number, userDTO: UpdateUserDto) {
  //   try {
  //     const user = await User.findByPk(id);

  //     if (!user) {
  //       throw new Error("Usuario no encontrado");
  //     }

  //     await User.update(
  //       {
  //         FullName: userDTO.FullName ?? user.FullName,
  //         Phone: userDTO.Phone ?? user.Phone,
  //         BirthDate: userDTO.BirthDate ?? user.BirthDate,
  //         PasswordHash: userDTO.Password
  //           ? await bcrypt.hash(userDTO.Password, 10)
  //           : user.PasswordHash,
  //         ModifiedAt: new Date(),
  //       },
  //       {
  //         where: {
  //           Id: id,
  //         },
  //       }
  //     );

  //     return await User.findByPk(id);
  //   } catch (error: any) {
  //     throw new Error("Error updating user" + error.message);
  //   }
  // }

  // async deleteUser(id: number) {
  //   try {
  //     await User.update(
  //       {
  //         StatusId: 2,
  //       },
  //       {
  //         where: {
  //           Id: id,
  //         },
  //       }
  //     );

  //     return true;
  //   } catch (error: any) {
  //     throw new Error("Error deleting user" + error.message);
  //   }
  // }
}
