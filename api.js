export async function getPlayers() {
  const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json())
  console.log(body);
  return body
}

export async function getRandomPlayer() {
  const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json())
  console.log(body);
  return body
}

export async function startFight() {
  const body = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    method: 'POST',
    body: JSON.stringify({
      hit,
      defence
    })
  })
  return body
}