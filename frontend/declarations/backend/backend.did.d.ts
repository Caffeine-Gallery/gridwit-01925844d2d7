import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Clue {
  'direction' : string,
  'text' : string,
  'number' : bigint,
}
export interface Puzzle {
  'id' : bigint,
  'grid' : Array<Array<[] | [number]>>,
  'clues' : Array<Clue>,
}
export interface _SERVICE {
  'getPuzzlePublic' : ActorMethod<[bigint], [] | [Puzzle]>,
  'validateAnswer' : ActorMethod<[bigint, bigint, bigint, number], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
