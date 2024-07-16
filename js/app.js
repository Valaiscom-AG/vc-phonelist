document.addEventListener('DOMContentLoaded', async () => {
    const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js');
    const supabaseUrl = 'https://ilmufbxfsvyhpaqwdyxg.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsbXVmYnhmc3Z5aHBhcXdkeXhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODI1OTc3NywiZXhwIjoyMDMzODM1Nzc3fQ.wdL26ds_JBVuEl_6e8TBQxRxa1Pqz2JmLQOlARKHJdE';

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Function to fetch and render employees
    async function fetchAndRenderPhonelist() {
        const { data, error } = await supabase.from('employees')
        .select('firstname, lastname, intphone, extphone, mobphone');
        if (error) {
            console.error('Error fetching employees:', error.message);
            return;
        }

        // Log data to inspect its structure
        console.log('Fetched data:', data);

        const employeeTableBody = document.getElementById('phone-table');
        employeeTableBody.innerHTML = '';

        data.forEach(employee => {
            console.log('Employee data:', employee); // Log each employee's data
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="pt-3">${employee.firstname} ${employee.lastname}</td>
                <td class="pt-3">${employee.intphone}</td>
                <td class="pt-3">${employee.extphone}</td>
                <td class="pt-3"><div class="collapse" id="collapseExample">
                ${employee.mobphone}
              </div></td>
            `;
            employeeTableBody.appendChild(row);
        });
    }

    // Fetch and render employees on initial load
    fetchAndRenderPhonelist();
});
