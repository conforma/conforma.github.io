document.addEventListener('DOMContentLoaded', async () => {
    const download = document.querySelector('#download a');
    const downloadAll = document.querySelector('#all-downloads a');
    if (!download) {
        return
    }
    try {
        const response = await fetch('https://api.github.com/repos/conforma/cli/releases/latest');
        const snapshot = await response.json();
        const uap = new UAParser();
        const os = uap.getOS().name.replace('macOS', 'darwin').toLowerCase();
        const arch = uap.getCPU().architecture;
        const file = `ec_${os}_${arch}`;
        const asset = snapshot.assets.find(a => a.name === file);
        if (asset) {
            // Update the download button href to the user's specific platform/arch
            download.href = asset.browser_download_url;
            download.title = `${uap.getOS().name} / ${uap.getCPU().architecture}`;
            // Unhide the download all button
            downloadAll.style.display = 'inline-flex';
        }
    } catch (e) {
        // Unable to fetch the releases leave the download link as is
        return;
    }
})
