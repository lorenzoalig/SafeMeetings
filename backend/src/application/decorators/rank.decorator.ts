import { Reflector } from "@nestjs/core";


export const Ranks = Reflector.createDecorator<number[]>();

export const IsSelfAllowed = Reflector.createDecorator<boolean>();