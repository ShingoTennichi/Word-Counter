export type userInput = {
  characters: string;
  frequency: [string, number][];
  input: string;
  wordBank: string[];
};

export type selectedArea = {
  characters: string;
  frequency: [string, number][];
  selected: string[];
  wordBank: string[];
};
export type Word = Meaning[] | [];

type Meaning = {
  word: string;
  meanings: Meaning[];
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
};

type Definition = {
  definition: string;
};
