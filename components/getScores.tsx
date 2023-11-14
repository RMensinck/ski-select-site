
export default async function getScores (setLoading, level, playfull, piste, powder, freeride, park, touring) {

    setLoading(true)
    const result = await (await fetch(`https://ski-selector-rhsyf3ay4q-ez.a.run.app/?level=${level}&playfull=${playfull}&piste=${piste}&powder=${powder}&freeride=${freeride}&park=${park}&touring=${touring}`)).text()
    const json_result = JSON.parse(result)
    const ski_names = Object.keys(json_result)
    const result_array = []
    
    for (const ski of ski_names) {
        result_array.push({ "name": ski, "score": json_result[ski].toFixed(1) })
    }
    // CAREFULL, toFixed turns scores into strings
    const sorted_results: any = result_array.sort(
        (ski1, ski2) => (parseFloat(ski1.score) < parseFloat(ski2.score)) ? 1 : (parseFloat(ski1.score) > parseFloat(ski2.score)) ? -1 : 0
    )
    setLoading(false)
    return sorted_results
}