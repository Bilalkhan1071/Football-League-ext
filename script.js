async function fetchData(countryCode, leagueCode) {
    const url = `https://livescore-football.p.rapidapi.com/soccer/league-table?country_code=${countryCode}&league_code=${leagueCode}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '929e25fdc2msh275bf5ae63b1ee0p187fa8jsnc9789185c07c',
            'X-RapidAPI-Host': 'livescore-football.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const standings = result.data.total;

        document.getElementById("standings").innerHTML = standings.map(team => `<li>${team.team_name}</li>`).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.getElementById("leagueForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const countryCode = document.getElementById("countryCode").value;
    const leagueCode = document.getElementById("leagueCode").value;
    fetchData(countryCode, leagueCode);
});


fetchData()