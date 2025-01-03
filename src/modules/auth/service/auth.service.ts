import * as bcrypt from "bcrypt";
import { CreateClientDto } from "../../client/dto/create-client.dto";
import ClientService from "../../client/service/client.service";
import { RoleService } from "../../role/service/role.service";
import { RegisterUserDto } from "../dto/register-user.dto";
import { User } from "../../user/model/user.model";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";
import UserSessionService from "../../userSession/service/user-session.service";
import { UpdateUserDto } from "../dto/update-user.dto";

export class AuthService {
  private clientService = new ClientService();
  private roleService = new RoleService();
  private userSessionService = new UserSessionService();

  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      const existingUser = await User.findOne({
        where: {
          Email: registerUserDto.Email,
        },
      });

      if (existingUser) {
        throw new Error("Ya existe un usuario con estas credenciales");
      }
      const nclient: CreateClientDto = {
        CompanyName: registerUserDto.CompanyName,
        TradeName: registerUserDto.TradeName,
        DeliveryAddress: registerUserDto.DeliveryAddress,
        Phone: registerUserDto.Phone,
        Email: registerUserDto.Email,
      };

      const client = await this.clientService.createClient(nclient);
      const role = await this.roleService.getRoleByName("Client");

      if (!role) {
        throw new Error("Ocurrio un error al buscar el rol");
      }

      const newUser = await User.create({
        Phone: registerUserDto.Phone,
        FullName: registerUserDto.FullName,
        PasswordHash: await bcrypt.hash(registerUserDto.Password, 10),
        Email: registerUserDto.Email,
        BirthDate: registerUserDto.BirthDate,
        ClientId: client.Id,
        RoleId: role.Id,
        StatusId: 1,
        CreatedAt: dayjs().format("YYYY-MM-DD"),
      });

      return {
        FullName: newUser.FullName,
        Email: newUser.Email,
        Phone: newUser.Phone,
        BirthDate: dayjs(newUser.BirthDate).add(1, "day").format("YYYY-MM-DD"),
      };
    } catch (error: any) {
      throw new Error("Error saving user" + error.message);
    }
  }

  async registerAdminUser(registerUserDto: RegisterUserDto) {
    try {
      const existingUser = await User.findOne({
        where: {
          Email: registerUserDto.Email,
        },
      });

      if (existingUser) {
        throw new Error("Ya existe un usuario con estas credenciales");
      }

      const client = await this.clientService.getClientByName("Admin");
      const role = await this.roleService.getRoleByName("Admin");

      if (!client) {
        throw new Error("No existe un cliente Admin");
      }

      if (!role) {
        throw new Error("Ocurrio un error al buscar el rol");
      }

      const newUser = await User.create({
        Phone: registerUserDto.Phone,
        FullName: registerUserDto.FullName,
        PasswordHash: await bcrypt.hash(registerUserDto.Password, 10),
        Email: registerUserDto.Email,
        BirthDate: registerUserDto.BirthDate,
        ClientId: client.Id,
        RoleId: role.Id,
        StatusId: 1,
        CreatedAt: dayjs().format("YYYY-MM-DD"),
      });

      return {
        FullName: newUser.FullName,
        Email: newUser.Email,
        Phone: newUser.Phone,
        BirthDate: dayjs(newUser.BirthDate).add(1, "day").format("YYYY-MM-DD"),
      };
    } catch (error: any) {
      throw new Error("Error saving user" + error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await User.findOne({
        where: {
          Email: email,
        },
      });

      if (!user || user.StatusId === 2) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const isValid = await bcrypt.compare(password, user.PasswordHash);
      if (!isValid) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const token = jwt.sign(
        {
          id: user.Id,
          email: user.Email,
        },
        envs.JWT_SECRET,
        {
          expiresIn: envs.JWT_EXPIRES_IN,
        }
      );

      await this.userSessionService.createUserSession({
        Token: token,
        UserId: user.Id ?? 0,
        ExpiresAt: dayjs().add(1, "day").toDate().toISOString(),
      });

      return {
        User: {
          Id: user.Id,
          Token: token,
          FullName: user.FullName,
          Email: user.Email,
          Phone: user.Phone,
          BirthDate: dayjs(user.BirthDate).add(1, "day").format("YYYY-MM-DD"),
          RoleId: user.RoleId,
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

      const user = await User.findByPk(userSession.UserId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return {
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        BirthDate: dayjs(user.BirthDate).add(1, "day").format("YYYY-MM-DD"),
      };
    } catch (error: any) {
      throw new Error("Error getting user" + error.message);
    }
  }

  async getUserById(id: number) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return {
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        BirthDate: dayjs(user.BirthDate).add(1, "day").format("YYYY-MM-DD"),
      };
    } catch (error: any) {
      throw new Error("Error getting user" + error.message);
    }
  }

  async updateUser(id: number, userDTO: UpdateUserDto) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      await User.update(
        {
          FullName: userDTO.FullName ?? user.FullName,
          Phone: userDTO.Phone ?? user.Phone,
          BirthDate: userDTO.BirthDate ?? user.BirthDate,
          PasswordHash: userDTO.Password
            ? await bcrypt.hash(userDTO.Password, 10)
            : user.PasswordHash,
          ModifiedAt: new Date(),
        },
        {
          where: {
            Id: id,
          },
        }
      );

      return await User.findByPk(id);
    } catch (error: any) {
      throw new Error("Error updating user" + error.message);
    }
  }

  async deleteUser(id: number) {
    try {
      await User.update(
        {
          StatusId: 2,
        },
        {
          where: {
            Id: id,
          },
        }
      );

      return true;
    } catch (error: any) {
      throw new Error("Error deleting user" + error.message);
    }
  }
}
