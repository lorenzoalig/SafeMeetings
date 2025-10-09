import { Injectable, NotImplementedException } from "@nestjs/common";


@Injectable()
export class RoomService {
    showRooms() {
        throw new NotImplementedException("Error: under construction");
    }

    showSingleRoom(id) {
        throw new NotImplementedException("Error: under construction");
    }

    createRoom(data) {
        throw new NotImplementedException("Error: under construction");
    }

    updateRoom(id, data) {
        throw new NotImplementedException("Error: under construction");
    }

    removeRoom(id) {
        throw new NotImplementedException("Error: under construction");
    }
}