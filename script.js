document.getElementById('startDate').addEventListener('change', calculateDeadlines);
document.querySelectorAll('input[name="direction"]').forEach(radio => {
  radio.addEventListener('change', calculateDeadlines);
});

function calculateDeadlines() {
  const inputVal = document.getElementById('startDate').value;
  const tbody = document.getElementById('resultsBody');
  const direction = document.querySelector('input[name="direction"]:checked').value;

  if (!inputVal) return;

  const [year, month, day] = inputVal.split('-').map(Number);
  const intervals = [7, 15, 30, 60, 90, 120];

  tbody.innerHTML = '';

  intervals.forEach(days => {
    const targetDate = new Date(year, month - 1, day);
    
    // Apply addition or subtraction based on user selection
    const dayOffset = direction === 'subtract' ? -days : days;
    targetDate.setDate(targetDate.getDate() + dayOffset);

    const formattedDate = targetDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const dayOfWeek = targetDate.toLocaleDateString('en-US', {
      weekday: 'long'
    });

    const prefix = direction === 'subtract' ? '-' : '+';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${prefix}${days} Days</strong></td>
      <td>${formattedDate}</td>
      <td>${dayOfWeek}</td>
    `;
    tbody.appendChild(row);
  });
}