// src/utils/dataProcessing.js
export function calculateMetrics(leads) {
  return {
    totalLeads: leads.length,
    qualifiedLeads: leads.filter(lead => lead.qualified === 'Yes').length,
    responseRate: calculateResponseRate(leads),
    leadsByState: groupLeadsByState(leads),
    leadsByPracticeType: groupLeadsByPracticeType(leads)
  };
}

function calculateResponseRate(leads) {
  const responses = leads.filter(lead => lead.response && lead.response.trim() !== '');
  return (responses.length / leads.length) * 100;
}

function groupLeadsByState(leads) {
  return leads.reduce((acc, lead) => {
    acc[lead.state] = (acc[lead.state] || 0) + 1;
    return acc;
  }, {});
}

function groupLeadsByPracticeType(leads) {
  return leads.reduce((acc, lead) => {
    acc[lead.practiceType] = (acc[lead.practiceType] || 0) + 1;
    return acc;
  }, {});
}
