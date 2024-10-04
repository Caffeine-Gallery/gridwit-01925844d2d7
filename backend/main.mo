import Bool "mo:base/Bool";
import Nat32 "mo:base/Nat32";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Char "mo:base/Char";

actor CrosswordPuzzle {
  type Clue = {
    number: Nat;
    direction: Text;
    text: Text;
  };

  type Puzzle = {
    id: Nat;
    grid: [[?Char]];
    clues: [Clue];
  };

  stable var puzzles : [Puzzle] = [
    {
      id = 1;
      grid = [
        [?'C', ?'A', ?'T', null, null],
        [?'O', null, ?'E', null, null],
        [?'D', ?'O', ?'A', null, null],
        [?'E', null, null, null, null],
        [null, null, null, null, null]
      ];
      clues = [
        { number = 1; direction = "across"; text = "Feline pet" },
        { number = 1; direction = "down"; text = "Programming language" },
        { number = 2; direction = "down"; text = "Deer" },
        { number = 3; direction = "across"; text = "Action word" }
      ];
    }
  ];

  private func getPuzzle(id: Nat) : ?Puzzle {
    Array.find(puzzles, func(p: Puzzle) : Bool { p.id == id })
  };

  public query func getPuzzlePublic(id: Nat) : async ?Puzzle {
    getPuzzle(id)
  };

  private func charToLower(c: Char) : Char {
    let n = Char.toNat32(c);
    if (n >= 65 and n <= 90) {
      Char.fromNat32(n + 32)
    } else {
      c
    }
  };

  private func charsEqual(a: Char, b: Char) : Bool {
    charToLower(a) == charToLower(b)
  };

  public func validateAnswer(puzzleId: Nat, row: Nat, col: Nat, answer: Char) : async Bool {
    switch (getPuzzle(puzzleId)) {
      case (null) { false };
      case (?puzzle) {
        if (row >= puzzle.grid.size() or col >= puzzle.grid[0].size()) {
          return false;
        };
        switch (puzzle.grid[row][col]) {
          case (null) { false };
          case (?char) { charsEqual(char, answer) };
        };
      };
    };
  };
}
