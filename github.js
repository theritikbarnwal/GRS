async function fetchGitHubRepo() {
    // Get input values
    const username = document.getElementById("username").value.trim();
    const repo = document.getElementById("repo").value.trim();

    // Check if username or repo is empty
    if (!username || !repo) {
        document.getElementById("repo-container").innerHTML = "Please enter both username and repository name.";
        return;
    }

    // Clear previous results
    document.getElementById("repo-container").innerHTML = "Loading...";

    try {
        // Fetch data from GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
        const data = await response.json();

        // Check if the response is valid
        if (response.ok) {
            document.getElementById("repo-container").innerHTML = `
                <h2>LINK: <a href="${data.html_url}" target="_blank">${data.name}</a></h2>
                <p><strong>Description:</strong> ${data.description || "No description available"}</p>
                <p><strong>Git Repo:</strong> ${data.full_name}</p>
                <p><strong>Watchers:</strong> ${data.watchers_count}</p>
                <p><strong>Subscribers:</strong> ${data.subscribers_count}</p>
                <p><strong>Language:</strong> ${data.language || "Not detected"}</p>
                <p><strong>Forks:</strong> 🍴 ${data.forks_count}</p>
                <p><strong>Created At:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
                <p><strong>Last Push:</strong> ${new Date(data.pushed_at).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> ${new Date(data.updated_at).toLocaleDateString()}</p>
                
               
                <style>
                .repo-container 
                {
                    font-family: Arial, sans-serif;
                }
                a 
                {
                    text-decoration: none;
                    color:rgba(147, 169, 76, 0.77);
                }
                a:hover
                {
                    color:rgba(200, 202, 75, 0.95);
                }    
                strong, h2
                {
                    color: #24acf0;;
                    font-size: 22px;
                }    
                p
                {
                    color: #ef3fb7;;
                    font-size: 1em;    
                }
    
                </style>
            `;
        } else {
            // Handle errors (e.g., repo not found)
            document.getElementById("repo-container").innerHTML = "Repository not found. Please check the username and repository name.";
        }
    } catch (error) {
        // Handle network or other errors
        document.getElementById("repo-container").innerHTML = "Error fetching data. Please try again.";
    }
}
