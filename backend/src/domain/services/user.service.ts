import { Injectable, NotImplementedException } from "@nestjs/common";

@Injectable()
export class UserService {
    showUsers() {
        throw new NotImplementedException("Error: under construction");
    }

    showSingleUser(id: number) {
        throw new NotImplementedException("Error: under construction");
    }

    createUser(data: any) {
        throw new NotImplementedException("Error: under construction");
    }

    updateUser(id: number, data: any) {
        throw new NotImplementedException("Error: under construction");
    }

    removeUser(id: number) {
        throw new NotImplementedException("Error: under construction");
    }
}