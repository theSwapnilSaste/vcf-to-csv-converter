// Function to convert VCF data to CSV format
function convertVCF() {
    const fileInput = document.getElementById('vcfInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a .vcf file!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const vcfText = e.targe
