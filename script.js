const leagueCodes = {
    "england": "premier-league",
    "france": "ligue-1",
    "germany": "bundesliga",
    "italy": "serie-a",
    "spain": "laliga"
};

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

        const tableBody = document.getElementById("standingsBody");
        tableBody.innerHTML = ''; // Clear previous data
        standings.forEach((team, index) => {
            const row = tableBody.insertRow();
            const nameCell = row.insertCell(0);
            const gpCell = row.insertCell(1);
            const winCell = row.insertCell(2);
            const drawCell = row.insertCell(3);
            const lossCell = row.insertCell(4);
            const gfCell = row.insertCell(5);
            const gaCell = row.insertCell(6);
            const gdCell = row.insertCell(7);
            const pointsCell = row.insertCell(8);
            
            nameCell.textContent = team.team_name;
            gpCell.textContent = team.games_played;
            winCell.textContent = team.won;
            drawCell.textContent = team.draw;
            lossCell.textContent = team.lost;
            gfCell.textContent = team.goals_for;
            gaCell.textContent = team.goals_against;
            gdCell.textContent = team.goals_diff;
            pointsCell.textContent = team.points;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.getElementById("leagueForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const countryCode = document.getElementById("countryCode").value;
    const leagueCode = leagueCodes[countryCode];
    fetchData(countryCode, leagueCode);
});

// Initial fetch
const initialCountryCode = "england"; // You can set any default country code here
const initialLeagueCode = leagueCodes[initialCountryCode];
fetchData(initialCountryCode, initialLeagueCode);
