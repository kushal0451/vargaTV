document.addEventListener('DOMContentLoaded', function() {
    const channelsContainer = document.getElementById('channels-container');

    fetch('https://your-bucket-name.s3.amazonaws.com/your-m3u-file.m3u8')
        .then(response => response.text())
        .then(data => {
            const m3uChannels = parseM3U(data);
            displayChannels(m3uChannels);
        })
        .catch(error => console.error('Error fetching channels:', error));

    function parseM3U(data) {
        const channels = [];
        const lines = data.split('\n');
        
        lines.forEach(line => {
            if (line.trim() && !line.startsWith('#')) {
                const [name, url] = line.split(',');
                channels.push({ name, url });
            }
        });

        return channels;
    }

    function displayChannels(channels) {
        channelsContainer.innerHTML = channels.map(channel => `
            <div class="channel">
                <img src="${channel.thumbnail || 'default-thumbnail.jpg'}" alt="${channel.name}" />
                <div class="channel-info">
                    <div class="channel-title">${channel.name}</div>
                    <div class="channel-action">
                        <button onclick="playChannel('${channel.url}')">Watch</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function playChannel(url) {
        const player = document.createElement('video');
        player.src = url;
        player.controls = true;
        document.body.appendChild(player);
        player.play();
    }
});
