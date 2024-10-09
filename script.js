// A dictionary to simulate accounts where the key is the barcode
const accounts = {
  123456: { name: "John Doe", status: "out", lastScan: "Never" },
  654321: { name: "Jane Smith", status: "out", lastScan: "Never" }
};

// Update the accounts table in the HTML
function updateAccountTable() {
  const tableBody = document.getElementById("accountTable");
  tableBody.innerHTML = ""; // Clear previous data
  for (const barcode in accounts) {
    const account = accounts[barcode];
    const row = `
      <tr>
        <td>${account.name}</td>
        <td>${account.status}</td>
        <td>${account.lastScan}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  }
}

// Function to toggle 'in' or 'out' when the barcode is scanned
function toggleStatus(barcode) {
  if (accounts[barcode]) {
    const account = accounts[barcode];
    account.status = account.status === "in" ? "out" : "in";
    account.lastScan = new Date().toLocaleString(); // Add timestamp
    updateAccountTable();
  } else {
    alert("Account not found for barcode: " + barcode);
  }
}

// Initialize Quagga.js for barcode scanning
Quagga.init(
  {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#camera") // Camera video element
    },
    decoder: {
      readers: ["code_128_reader"] // Barcode type (e.g., Code 128)
    }
  },
  function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Quagga initialized. Starting...");
    Quagga.start();
  }
);

// When a barcode is detected
Quagga.onDetected(function (data) {
  const barcode = data.codeResult.code;
  console.log("Barcode detected: " + barcode);
  toggleStatus(barcode);
});

// Initial call to populate the table
updateAccountTable();
// Create 100 user accounts (initially without barcodes)
let accounts = {};

// Function to create 100 accounts
function createUsers() {
  for (let i = 1; i <= 100; i++) {
    const name = `User ${i}`;
    accounts[`barcode${i}`] = {
      name: name,
      status: "out",
      lastScan: "Never"
    };
  }
}

// Call function to create the 100 users
createUsers();

// Update the accounts table in the HTML
function updateAccountTable() {
  const tableBody = document.getElementById("accountTable");
  tableBody.innerHTML = ""; // Clear previous data
  for (const barcode in accounts) {
    const account = accounts[barcode];
    const row = `
      <tr>
        <td>${account.name}</td>
        <td>${account.status}</td>
        <td>${account.lastScan}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  }
}

// Function to assign barcode to account
function assignBarcodeToAccount(accountName, barcode) {
  if (!accounts[barcode]) {
    // If this barcode isn't already assigned
    accounts[barcode] = {
      name: accountName,
      status: "out", // Default status is "out"
      lastScan: "Never"
    };
    updateAccountTable(); // Refresh the table with new data
  } else {
    alert("This barcode is already assigned to another account.");
  }
}

// Form submission handler for barcode assignment
document
  .getElementById("barcodeAssignmentForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload
    const accountName = document.getElementById("accountName").value;
    const barcode = document.getElementById("barcodeInput").value;

    if (accountName && barcode) {
      assignBarcodeToAccount(accountName, barcode);
      document.getElementById("accountName").value = ""; // Clear input fields
      document.getElementById("barcodeInput").value = "";
    } else {
      alert("Please fill in both fields.");
    }
  });

// Barcode scan toggle status function
function toggleStatus(barcode) {
  if (accounts[barcode]) {
    const account = accounts[barcode];
    account.status = account.status === "in" ? "out" : "in";
    account.lastScan = new Date().toLocaleString(); // Add timestamp
    updateAccountTable();
  } else {
    alert("Account not found for barcode: " + barcode);
  }
}

// Initialize Quagga.js for barcode scanning
Quagga.init(
  {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#camera") // Camera video element
    },
    decoder: {
      readers: ["code_128_reader"] // Barcode type
    }
  },
  function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Quagga initialized. Starting...");
    Quagga.start();
  }
);

// When a barcode is detected
Quagga.onDetected(function (data) {
  const barcode = data.codeResult.code;
  console.log("Barcode detected: " + barcode);
  toggleStatus(barcode); // Toggle account status for scanned barcode
});

// Initial call to populate the table with the 100 users
updateAccountTable();
