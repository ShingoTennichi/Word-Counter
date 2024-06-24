import styles from "../../styles/Home.module.css";
import type { Word } from "../../types/types";

export default function Meanings({ meaning }: { meaning: Word }): JSX.Element {
  return (
    <div className={styles.meanings}>
      <div>
        <h3>{"Meaning of " + meaning[0].word}</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th className={styles.th}>Part of Speech</th>
            <th className={styles.th}>Definition</th>
          </tr>
        </thead>
        <tbody>
          {meaning.map(({ meanings }) => {
            return meanings.map(({ partOfSpeech, definitions }) => {
              return definitions.map(({ definition }, index) => {
                return (
                  <tr key={index}>
                    <td className={`${styles.td} ${styles.tdPos}`}>
                      {partOfSpeech}
                    </td>
                    <td className={`${styles.td} ${styles.tdDef}`}>
                      {definition}
                    </td>
                  </tr>
                );
              });
            });
          })}
        </tbody>
      </table>
    </div>
  );
}
