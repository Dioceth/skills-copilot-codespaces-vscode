function skillsMember() {
    var skills = ['HTML', 'CSS', 'JS', 'PHP', 'MySQL'];
    var member = {
        name: 'John',
        age: 25,
        skills: skills,
        address: {
            city: 'Paris',
            country: 'France'
        }
    };
    console.log(member.skills[2]);
    console.log(member.address.city);
}
