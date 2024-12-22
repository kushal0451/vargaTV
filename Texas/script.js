document.addEventListener('DOMContentLoaded', function() {
    const channelsContainer = document.getElementById('channels-container');
    const channelFolder = './Channels/'; // Folder containing M3U files

    const m3uFiles = [
        'group1.m3u', //please dd the m3u files here
        'group2.m3u',
        'gt.m3u',
        'playlist_india.m3u8',
        'playlist_japan.m3u8',
        'playlist_korea.m3u8',
        'playlist_north_korea.m3u8',
        'playlist_russia.m3u8',
        'playlist_usa.m3u8',
        'playlist_usa_vod.m3u8',
        'playlist_zz_documentaries_en.m3u8',
        'playlist_zz_movies.m3u8'
    ];

    m3uFiles.forEach(file => {
        const channelName = file.replace('.m3u', '');
        const channelUrl = `${channelFolder}${file}`;

        const channelElement = `
            <div class="channel">
                <img src="default-thumbnail.jpg" alt="${channelName}" />
                <div class="channel-info">
                    <div class="channel-title">${channelName}</div>
                    <div class="channel-action">
                        <button onclick="playChannel('${channelUrl}')">Watch</button>
                    </div>
                </div>
            </div>
        `;
        channelsContainer.innerHTML += channelElement;
    });

    function playChannel(url) {
        const player = document.createElement('video');
        player.src = url;
        player.controls = true;
        player.autoplay = true;
        document.body.appendChild(player);
    }
});
