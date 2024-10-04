export const idlFactory = ({ IDL }) => {
  const Clue = IDL.Record({
    'direction' : IDL.Text,
    'text' : IDL.Text,
    'number' : IDL.Nat,
  });
  const Puzzle = IDL.Record({
    'id' : IDL.Nat,
    'grid' : IDL.Vec(IDL.Vec(IDL.Opt(IDL.Nat32))),
    'clues' : IDL.Vec(Clue),
  });
  return IDL.Service({
    'getPuzzlePublic' : IDL.Func([IDL.Nat], [IDL.Opt(Puzzle)], ['query']),
    'validateAnswer' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat32],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
