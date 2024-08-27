// ==UserScript==
// @name         Highlight the Non-Followers
// @namespace    http://tampermonkey.net/
// @version      2024-08-07
// @description  This script will highlight the non followers in your profile.
// @author       Rama Vats
// @match        https://x.com/rama_vats/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function highlightNonFollowers() {
        const currentUrl = window.location.href;
        const targetUrl = "https://x.com/rama_vats/following"; // Change to your username

        if (currentUrl === targetUrl) {
            // Get all div elements that match the structure in "DoesntFollowMe.txt"
            const nonFollowers = document.querySelectorAll('div[data-testid="cellInnerDiv"]');

            nonFollowers.forEach(div => {
                const userAvatarContainer = div.querySelector('div[data-testid*="UserAvatar-Container"]');
                const followIndicator = div.querySelector('div[data-testid="userFollowIndicator"]');
                if (userAvatarContainer && !followIndicator) {
                    div.style.backgroundColor = '#64181c';
                }
            });
        }
    }

    // Run the function to highlight non-followers after a 5-second delay if on the correct page
    setTimeout(highlightNonFollowers, 2000);

    // Observe changes in the DOM and re-check the URL
    const observer = new MutationObserver(() => {
        setTimeout(highlightNonFollowers, 2000);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Stop the script if the user navigates away from the target URL
    const urlObserver = new MutationObserver(() => {
        const currentUrl = window.location.href;
        if (currentUrl !== "https://x.com/rama_vats/following") {
            observer.disconnect();  // Stop observing changes to the DOM
            console.log("Script is disabled on this page");
        } else {
            observer.observe(document.body, { childList: true, subtree: true });  // Resume observing if back on the correct page
        }
    });

    urlObserver.observe(document.body, { childList: true, subtree: true });

})();
