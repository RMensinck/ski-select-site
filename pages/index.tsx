import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';


export default function Home() {
  const start_value: number = 5
  const [level, setLevel] = useState(start_value)
  const [playfull, setPlayfull] = useState(start_value)
  const [piste, setPiste] = useState(start_value)
  const [park, setPark] = useState(start_value)
  const [powder, setPowder] = useState(start_value)
  const [freeride, setFreeride] = useState(start_value)
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(false)

  const getScores = async () => {
    setLoading(true)
    const result = await (await fetch(`https://ski-selector-rhsyf3ay4q-ez.a.run.app/?level=${level}&playfull=${playfull}&piste=${piste}&powder=${powder}&freeride=${freeride}&park=${park}`)).text()
    const json_result = JSON.parse(result)
    const ski_names = Object.keys(json_result)
    const result_array = []
    for (const ski of ski_names) {
      result_array.push({ "name": ski, "score": json_result[ski] })
    }
    const sorted_results: any = result_array.sort(
      (ski1, ski2) => (ski1.score < ski2.score) ? 1 : (ski1.score > ski2.score) ? -1 : 0
    )
    setScores(sorted_results)
    setLoading(false)
  }

  const inputFields = [
    { "name": "Piste", "id": "piste", "setFunction": setPiste },
    { "name": "Park", "id": "park", "setFunction": setPark },
    { "name": "Powder", "id": "powder", "setFunction": setPowder },
    { "name": "Freeride", "id": "freeride", "setFunction": setFreeride },
    { "name": "User level", "id": "level", "setFunction": setLevel },
    { "name": "Playfullness", "id": "playfull", "setFunction": setPlayfull },
  ]

  return (
    <>
      <Head>
        <title>Ski Selector</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Ski Selector</h1>
        <p className={styles.description}>
          Find the ski that fits you!
        </p>
        <div className={styles.grid}>
          {inputFields.map((input, index) => (
            <div key={index} className={styles.inputContainer}>
              <label htmlFor={input.id} className={styles.label}>
                {input.name}
              </label>
              <input
                type="range"
                id={input.id}
                name={input.id}
                min="0"
                max="10"
                className={styles.slider}
                onChange={(val) => input.setFunction(Number(val.target.value))}
              />
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={() => getScores()}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        {scores.length > 0 && (
          <div className={styles.scores}>
            <h2>Your Top Ski Choices</h2>
            {scores.slice(0, 5).map((ski, index) => (
              <p key={index}>
                {ski.score} {ski.name}
              </p>
            ))}
          </div>
        )}
      </main>
    </>
  )
}