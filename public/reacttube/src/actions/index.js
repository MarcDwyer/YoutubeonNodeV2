

export const STREAMER = 'streamerherrdurr';
export const ACTIVE_STREAMERS = 'activeherrdurrr';
export const ISTOGGLED = 'istoglerrerer';
export const CURRENT_STREAM = 'fmjerfperfe';
export const IMAGES = 'spdjfeipjmfr'
export const FEATURED = 'owekfpwkpwm';
export async function getStreams() {
    
    const fetchStreamerList = await fetch('/streamer/list');
    const dataStreamerList = await fetchStreamerList.json();

    const data = await Promise.all(dataStreamerList.map(async (item) => {
        const fetchStreamer = await fetch(`/streamer/${item}`)
        const dataStreamer = await fetchStreamer.json();
        dataStreamer.name = item;
        return dataStreamer;
    }));
    
    return {
        type: STREAMER,
        payload: data 
    }
}

export async function getActiveStreams(arry) {
    const data = await Promise.all(arry.map(async (item) => {
        const fetchActiveStreams = await fetch(`/streamer/stats/${item}`);
        const dataActiveStreams = await fetchActiveStreams.json();
        dataActiveStreams.name = item;
        return dataActiveStreams;
    }));
return {
    type: ACTIVE_STREAMERS,
    payload: data
}
}

export function isPlaying(obj) {
    return {
        type: ISTOGGLED,
        payload: obj
    }
}

export function currentStream(obj) {
    return {
        type: CURRENT_STREAM,
        payload: obj
    }
}

export function getFeatured(stream) {
    return {
        type: FEATURED,
        payload: stream 
    }
}