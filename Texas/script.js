document.addEventListener('DOMContentLoaded', function() {
    const channelsContainer = document.getElementById('channels-container');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    let m3uChannels = [];

    // Show loading spinner
    const showLoadingSpinner = () => {
        const spinner = document.getElementById('loading-spinner');
        spinner.style.display = 'flex';
    };

    // Hide loading spinner
    const hideLoadingSpinner = () => {
        const spinner = document.getElementById('loading-spinner');
        spinner.style.display = 'none';
    };

    // Fetch M3U data
    fetch('https://your-bucket-name.s3.amazonaws.com/your-m3u-file.m3u')
        .then(response => response.text())
        .then(data => {
            hideLoadingSpinner();
            m3uChannels = parseM3U(data);
            displayChannels(m3uChannels);
        })
        .catch(error => {
            hideLoadingSpinner();
            console.error('Error fetching M3U data:', error);
            channelsContainer.innerHTML = '<p>Failed to load channels. Please try again later.</p>';
        });

    function parseM3U(data) {
        const channels = [];
        const lines = data.split('\n');
        
        lines.forEach(line => {
            if (line.trim() && !line.startsWith('#')) {
                const [name, url, thumbnail] = line.split(',');
                channels.push({ name, url, thumbnail });
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
        player.style.width = '100%';
        document.body.appendChild(player);
        player.play().catch(error => {
            console.error('Error playing channel:', error);
            alert('Failed to play channel. Please try again.');
        });
    }

    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
    });
});
