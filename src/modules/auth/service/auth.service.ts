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

export class AuthService {
  private clientService = new ClientService();
  private roleService = new RoleService();
  private userSessionService = new UserSessionService();

  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      const nclient: CreateClientDto = {
        CompanyName: registerUserDto.CompanyName,
        TradeName: registerUserDto.TradeName,
        DeliveryAddress: registerUserDto.DeliveryAddress,
        Phone: registerUserDto.Phone,
        Email: registerUserDto.Email,
      };

      const client = await this.clientService.createClient(nclient);
      const role = await this.roleService.getRoleByName("client");

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

      if (!user) {
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
        token,
        user: {
          FullName: user.FullName,
          Email: user.Email,
          Phone: user.Phone,
          BirthDate: dayjs(user.BirthDate).add(1, "day").format("YYYY-MM-DD"),
        },
      };
    } catch (error: any) {
      throw new Error("Error loging user" + error.message);
    }
  }
}
