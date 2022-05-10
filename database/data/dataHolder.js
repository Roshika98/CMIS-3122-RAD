var deptData = [
    [1, 'Department of Computing & Information Systems'],
    [2, 'Department of Electronics'],
    [3, 'Department of Mathematical Sciences'],
    [4, 'Department of Industrial Management']
]

//! order of data is as follows--------------------
// * coursecode, name , credit , level , semester , department ,  specialavailability , sp optionality , maj1 availability, maj1 optionality , maj2 availability , maj2 optionality , general avaialbility , general optionality

var modulesData = [
    ['CMIS1113', 'Introduction to Computers & Operating Systems', 3, 1, 1, 1, true, true, true, true, true, true, true, true],
    ['CMIS1123', 'Computer Programming I', 3, 1, 1, 1, true, true, true, true, true, true, true, true],
    ['CMIS1131', 'Practical Computing I', 1, 1, 1, 1, true, true, true, true, true, true, true, true],
    ['CMIS1212', 'Computer Programming II', 2, 1, 2, 1, true, true, true, true, true, true, true, true],
    ['CMIS1221', 'Practical Computing II', 1, 1, 2, 1, true, true, true, true, true, true, true, true],
    ['CMIS2113', 'Object Oriented Programming', 3, 2, 1, 1, true, true, true, true, true, true, true, true],
    ['CMIS2123', 'Database Management Systems', 3, 2, 1, 1, true, true, true, true, true, true, true, true],
    ['CMIS2214', 'Data Structures & Analysis of Algorithms', 4, 2, 2, 1, true, true, true, true, true, true, true, true],
    ['CMIS3114', 'Data Communication & Computer Networks', 4, 3, 1, 1],
    ['CMIS3122', 'Rapid Application Development', 2, 3, 1, 1],
    ['CMIS3134', 'Computer Architecture & Compiler Design', 4, 3, 1, 1],
    ['CMIS3142', 'Computational Methods', 2, 3, 1, 1],
    ['CMIS3153', 'Advanced Database Systems', 3, 3, 1, 1],
    ['CMIS3214', 'Software Engineering', 4, 3, 2, 1],
    ['CMIS3224', 'Web Design and e-commerce', 4, 3, 2, 1],
    ['CMIS3234', 'Computer Graphics and Visualization', 4, 3, 2, 1],
    ['CMIS3242', 'Mobile and Ubiquitous Computing', 2, 3, 2, 1],
    ['CMIS3253', 'Data Mining', 3, 3, 2, 1],
    ['CMIS4114', 'Artificial Intelligence', 4, 4, 1, 1],
    ['CMIS4123', 'Advanced Operating Systems', 3, 4, 1, 1],
    ['CMIS4144', 'Distributed and Cloud Computing', 4, 4, 1, 1],
    ['CMIS4134', 'Distributed and Cloud Computing', 4, 4, 1, 1],
    ['CMIS4152', 'Image Processing', 2, 4, 1, 1],
    ['CMIS4142', 'Image Processing', 2, 4, 1, 1],
    ['CMIS4153', 'Parallel Computing', 3, 4, 1, 1],
    ['CMIS4+18', 'Research Project', 8, 4, 1, 1],
    ['CMIS4+24', 'Project', 4, 4, 1, 1],
    ['CMIS4216', 'Industrial Training', 6, 4, 2, 1],
    ['ELTN1112', 'Fundamentals of Electricity & Magnetism', 2, 1, 1, 2, true, true, true, true, true, true, true, true],
    ['ELTN1122', 'Introduction to Semiconductors', 2, 1, 1, 2, true, true, true, true, true, true, true, true],
    ['ELTN1132', 'Basic Digital Electronics', 2, 1, 1, 2, true, true, true, true, true, true, true, true],
    ['ELTN1212', 'Basic Electronics - Lab', 2, 1, 2, 2, true, true, true, true, true, true, true, true],
    ['ELTN1222', 'General Physics', 2, 1, 2, 2, true, true, true, true, true, true, true, true],
    ['ELTN2112', 'Electricity & Magnetism', 2, 2, 1, 2, true, true, true, true, true, true, true, true],
    ['ELTN2121', 'Electricity & Magnetism - Lab', 1, 2, 1, 2, true, true, true, true, true, true, true, true],
    ['ELTN2213', 'Semiconductor Devices', 3, 2, 2, 2, true, true, true, true, true, true, true, true],
    ['ELTN2221', 'Semiconductor Devices - Lab', 1, 2, 2, 2, true, true, true, true, true, true, true, true],
    ['ELTN2232', 'Analogue Electronics', 2, 2, 2, 2, true, true, true, true, true, true, true, true],
    ['ELTN2241', 'Analogue Electronics - Lab', 1, 2, 2, 2, true, true, true, true, true, true, true, true],
    ['ELTN3113', 'Digital Electronics', 3, 3, 1, 2, true, true, true, true, true, true, true, true],
    ['ELTN3121', 'Digital Electronics - Lab', 1, 3, 1, 2, true, true, true, true, true, true, true, true],
    ['ELTN3133', 'Data Acquistion and Signal Processing', 3, 3, 1, 2],
    ['ELTN3141', 'Data Acquistion and Signal Processing - Lab', 1, 3, 1, 2],
    ['ELTN3+53', 'Applied Electronics Laboratory I', 3, 3, 1, 2],

];


module.exports = { deptData, modulesData };