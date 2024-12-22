document.addEventListener('DOMContentLoaded', function() {
    const channelsContainer = document.getElementById('channels-container');
    const channelFolder = './Channels/'; // Folder containing M3U files

    const m3uFiles = [
        'file1.m3u', // Add all your M3U filenames here
        'file2.m3u',
        'file3.m3u'
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
