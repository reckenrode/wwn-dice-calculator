Hooks.on('dcCalcWhitelist', (whitelist, actor) => {
    whitelist.wwn = {
        custom: {
            abilities: ['str', 'dex', 'con', 'int', 'wis', 'cha'].reduce((acc, scoreName) => {
                acc[scoreName] = {
                    customScores: `ability_${scoreName}`,
                    name: scoreName.toUpperCase(),
                    formula: `@scores.${scoreName}.mod`
                };
                return acc;
            }, {}),
            attributes: Object.keys(actor.data.data.skills)
                .filter(name => !name.startsWith('unspent') && ['biopsionics', 'metapsionics', 'precognition', 'telekinesis', 'telepathy', 'teleportation'].indexOf(name) < 0)
                .reduce((acc, skillName) => {
                    acc[skillName] = {
                        label: `skill_${skillName}`,
                        name: skillName,
                        formula: `2d6 + @skills.${skillName}.value`
                    };
                    return acc;
                }, {})
        }
    };
});
