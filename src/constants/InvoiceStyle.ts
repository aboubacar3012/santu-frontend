export const printStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  .invoice-container {
    font-family: 'Inter', sans-serif;
    --primary-color: #4F46E5;
    --secondary-color: #818CF8;
    --text-color: #1F2937;
    --light-bg: #F9FAFB;
    --accent-color: #10B981;
  }
  
  .invoice-card {
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .invoice-header {
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
  }
  
  .status-badge {
    transition: all 0.3s ease;
  }
  
  .invoice-table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }
  
  .invoice-table th {
    background-color: var(--light-bg);
    color: var(--text-color);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }
  
  .invoice-table th, .invoice-table td {
    padding: 1rem;
    border-bottom: 1px solid #E5E7EB;
  }
  
  .invoice-table tbody tr:hover {
    background-color: rgba(79, 70, 229, 0.05);
  }
  
  @media print {
    body * {
      visibility: visible;
    }

    .no-print, .no-print * {
      display: none !important;
    }

    .print-section {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background-color: white;
    }

    @page {
      margin: 1cm;
      size: auto;
    }

    header, footer, nav {
      display: none !important;
    }

    .invoice-card {
      box-shadow: none !important;
      border: 1px solid #E5E7EB;
    }
    
    .invoice-header:after {
      display: none;
    }
  }
`;
