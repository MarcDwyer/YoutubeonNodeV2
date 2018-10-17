

export const STREAMER = 'streamerherrdurr';
export const ACTIVE_STREAMERS = 'activeherrdurrr';
export const ISTOGGLED = 'istoglerrerer';
export const CURRENT_STREAM = 'fmjerfperfe';
export const IMAGES = 'spdjfeipjmfr'
export const FEATURED = 'owekfpwkpwm';


export async function getStreams() {
    const fetchData = await fetch('/streamers/all')
    const dataFetch = await fetchData.json();

    return {
        type: STREAMER,
        payload: dataFetch
    }
}

export async function getActiveStreams() {
  const fetchData = await fetch('/streamers/live')
  const dataFetch = await fetchData.json();

return {
    type: ACTIVE_STREAMERS,
    payload: dataFetch
}
}


export function getFeatured(stream) {
    return {
        type: FEATURED,
        payload: stream
    }
}
