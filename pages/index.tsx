import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useId } from "react";
import { ChangeEvent } from "react";
import data from "../JSON/bannedWords.json";
import frequentlyUsed from "./components/frequentlyUsedWords";
import { userInput, selectedArea, Word } from "../types/types";
import Synonyms from "./components/Synonyms";
import Meanings from "./components/Meanings";
import Footer from "./components/Footer";

const Home: NextPage = () => {
  const id = useId();
  const [meaning, setMeaning] = useState<Word>([]);
  const [selectedArea, setSelectedArea] = useState<selectedArea>({
    characters: "",
    selected: [],
    frequency: [],
    wordBank: [],
  });
  const [userInput, setUserInput] = useState<userInput>({
    characters: "",
    frequency: [],
    input: "",
    wordBank: [],
  });
  const bannedWords: { [key: string]: boolean } = data;
  const btn =
    selectedArea.characters === ""
      ? `${styles.btn} ${styles.btnEmp}`
      : styles.btn;
  function handleInput(input: ChangeEvent<HTMLTextAreaElement>) {
    const inputString: string = input.target.value;
    getUserInput(inputString);
    resizeTextArea();
  }

  function getUserInput(input: string) {
    const formatString: string = input.trim().replace(/[\n.,"'’-]/g, " ");
    const words: string[] = formatString.split(" ").filter((s) => {
      return s !== "";
    });
    const mostFrequency: [string, number][] = frequentlyUsed(
      words,
      bannedWords
    );
    setUserInput({
      ...userInput,
      characters: formatString,
      frequency: mostFrequency,
      input: input,
      wordBank: words,
    });
  }

  function getSelectedWord(): void {
    const selected: string[] =
      window.getSelection()?.toString().trim().split(" ") ?? [];
    // console.log(input.target.value);
    console.log(selected);
    if (selected.length === 1) {
      if (selected[0] !== "") {
        setSelectedArea({
          characters: selected[0],
          selected: [],
          frequency: [],
          wordBank: [],
        });
      } else {
        // reset
        setSelectedArea({
          characters: "",
          selected: [],
          frequency: [],
          wordBank: [],
        });
      }
    } else {
      const formatString: string =
        window
          .getSelection()
          ?.toString()
          .trim()
          .replace(/[\n.,"'’-]/g, " ") ?? "";
      const words: string[] = formatString.split(" ").filter((s) => {
        return s !== "";
      });
      const mostFrequency: [string, number][] = frequentlyUsed(
        words,
        bannedWords
      );
      setSelectedArea({
        ...userInput,
        characters: formatString,
        frequency: mostFrequency,
        selected: selected,
        wordBank: words,
      });
    }
  }

  async function getMeaning(word: string) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMeaning(data);
        // console.log(data);
      });
    // console.log(meaning);
  }

  const resizeTextArea = (): void => {
    let textarea: HTMLElement | null = document.getElementById("wordHolder");
    if (textarea) {
      textarea.style.height = "0px";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Word Counter</title>
        <meta
          name="description"
          content="Word counting application with searching meanings and synonyms function"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.gridContainer}>
          <div className={styles.title}>
            <h1>Word Counter</h1>
          </div>
          <div>
            <div className={styles.inputArea}>
              <button
                className={btn}
                onClick={() => getMeaning(selectedArea.characters)}
              >
                Meaning & Synonyms
              </button>
              <textarea
                id="wordHolder"
                name="wordHolder"
                onChange={(input) => handleInput(input)}
                onMouseUp={() => getSelectedWord()}
                onKeyUp={() => getSelectedWord()}
                value={userInput.input}
              ></textarea>
              {meaning.length !== 0 && (
                <div>
                  <Meanings meaning={meaning} />
                  <Synonyms meaning={meaning} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.total}>
            <div className={styles.details}>
              <h3 className={styles.mbSmall}>Details</h3>
              <p className={styles.mbSmall}>
                Words:&nbsp;
                {selectedArea.wordBank.length
                  ? selectedArea.wordBank.length
                  : userInput.wordBank.length}
              </p>
              <p className={styles.mbSmall}>
                Characters:&nbsp;
                {selectedArea.characters
                  ? selectedArea.characters.length
                  : userInput.characters.length}
              </p>
            </div>
            <div className={styles.wordCollections}>
              <h3 className={styles.mbSmall}>Words</h3>
              <ul>
                {!selectedArea.wordBank.length &&
                  !userInput.wordBank.length && <p>No words</p>}
                {selectedArea.wordBank.length
                  ? selectedArea.frequency.map((word) => {
                      return (
                        <li key={id + word[0]}>
                          {word[0]} : {word[1]}
                        </li>
                      );
                    })
                  : userInput.frequency.map((word) => {
                      return (
                        <li key={id + word[0]}>
                          {word[0]} : {word[1]}
                        </li>
                      );
                    })}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
