// Function to convert VCF data to CSV format
document.getElementById('convertBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('vcfInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a .vcf file!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const vcfText = e.target.result;
        const csvData = parseVCF(vcfText);
        if (csvData) {
            generateDownload(csvData);
        } else {
            alert('No valid contacts found in the VCF file.');
        }
    };
    reader.readAsText(file);
});

// Function to parse VCF content and return CSV format
function parseVCF(vcfText) {
    const lines = vcfText.split("\n");
    let csvContent = "Name,Phone,Email\n";
    let name = "", phone = "", email = "";
    let contactFound = false;

    lines.forEach(line => {
        line = line.trim();  // Clean up extra whitespace

        if (line.startsWith("FN:")) {
            name = line.substring(3).trim();
        } else if (line.startsWith("TEL:")) {
            phone = line.substring(4).trim();
        } else if (line.startsWith("EMAIL:")) {
            email = line.substring(6).trim();
        }

        // Once name, phone, and email are populated, append them to CSV
        if (name && phone && email) {
            csvContent += `"${name}","${phone}","${email}"\n`;
            name = ""; phone = ""; email = "";  // Reset for the next contact
            contactFound = true;
        }
    });

    return contactFound ? csvContent : null;  // Return null if no contacts are found
}

// Function to create a downloadable CSV file
function generateDownload(csvData) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    
    downloadLink.href = url;
    downloadLink.download = 'contacts.csv';
    downloadLink.classList.remove('hidden');
    downloadLink.textContent = 'Download CSV';
}
