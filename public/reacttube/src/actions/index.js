

export const STREAMER = 'streamerherrdurr';
export const ACTIVE_STREAMERS = 'activeherrdurrr';
export const NET_REQUEST = 'asdada';


export async function getStreams() {
    const fetchData = await fetch('/streamers/all');
    const dataFetch = await fetchData.json();

    return {
        type: STREAMER,
        payload: dataFetch
    }
}

export async function getActiveStreams() {
  const fetchData = await fetch('/streamers/live');
  const dataFetch = await fetchData.json();



return {
    type: ACTIVE_STREAMERS,
    payload: dataFetch
}
}

export function fetchTimes() {
    return {
        type: NET_REQUEST,
        payload: 1
    }
}
