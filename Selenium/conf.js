exports.config = {
  
  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
    'browserName': 'firefox'	
  },

  specs: ['spec.js']
};
