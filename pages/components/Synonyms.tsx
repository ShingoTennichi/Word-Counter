import type { Word } from "../../types/types";
import styles from "../../styles/Home.module.css";

export default function Synonyms({ meaning }: { meaning: Word }): JSX.Element {
  return (
    <div className="synonyms">
      <div>
        <h3>{"Synonyms of " + meaning[0].word}</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th className={styles.th}>Part of Speech</th>
            <th className={styles.th}>Synonym</th>
          </tr>
        </thead>
        <tbody>
          {meaning.map(({ meanings }) => {
            return meanings.map(({ partOfSpeech, synonyms }) => {
              return synonyms.map((synonym, index) => {
                return (
                  <tr key={index} className={styles.tr}>
                    <td className={`${styles.td} ${styles.tdPos}`}>
                      {partOfSpeech}
                    </td>
                    <td className={`${styles.td} ${styles.tdDef}`}>
                      {synonym}
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
