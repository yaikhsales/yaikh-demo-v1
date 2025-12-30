import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import ImageViewer from './ImageViewer';

const AboutUs = ({ onClose }) => {
    const navigate = useNavigate();
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [expandedMember, setExpandedMember] = useState(null);
    
    const aboutUsContent = [
        {
            language: 'ខ្មែរ',
            text: 'Yaikh គឺជាវេទិកាដំណោះស្រាយសម្រាប់ការផលិតដែលត្រូវបានរចនាជាពិសេសសម្រាប់ការផលិតសម្លៀកបំពាក់ ស្បែកជើង កាបូប និងផលិតផល softgoods ផ្សេងៗ។ ជាកម្មសិទ្ធិរបស់ TexLink Technologies ដែលបានចុះបញ្ជីនៅកម្ពុជា វេទិកានេះដំណើរការលើប្រព័ន្ធ Windows, iOS, និង Android។'
        },
        {
            language: 'English',
            text: 'Yaikh is a manufacturing solution platform specially designed for garment, footwear, bags, and softgoods manufacturing. Owned by TexLink Technologies registered in Cambodia, the platform operates on Windows, iOS, and Android platforms.'
        },
        {
            language: '中文',
            text: 'Yaikh 是一个专门为服装、鞋类、箱包和软质品制造业设计的生产解决方案平台。该平台归属在柬埔寨注册的 TexLink Technologies 公司所有，并支持 Windows、iOS和Android 操作系统'
        }
    ];

    const teamMembers = [
        {
            name: 'Gamini K',
            title: 'Manager YAI',
            contact: '+855 92 973 194',
            email: 'gamini@yalkh.com',
            image: '/assets/about-us/teams/gamini.jpg',
            skills: [],
            projects: []
        },
        {
            name: 'PICH Daly',
            title: 'Digital Development Supervisor',
            contact: '+855 78 255 700',
            email: 'dalypich100@gmail.com',
            image: '/assets/about-us/teams/daly.jpg',
            skills: ['Computer', 'Organized', 'Communication', 'Teamwork', 'Meeting deadlines', 'Critical thinking'],
            projects: []
        },
        {
            name: 'DILAN Lakmal',
            title: 'Lead Data Engineer',
            contact: '+855 75 891 3639',
            email: 'dilan@yorkmars.com',
            image: '/assets/about-us/teams/dilan.jpg',
            skills: ['Full-Stack Web Developer', 'Data Engineer', 'Power BI Specialist'],
            projects: [
                'YQMS (Start in 2024.12.1 to continue) - Include 20+ sub systems',
                'YQMS Visualization (Phase 2 of YQMS)',
                'YQMS AI (Phase 3 of YQMS)',
                'Power BI Data Analysis and other Data Analysis works (2022.8.6-2024.11.30) - Includes all of YM, YY, CA'
            ]
        },
        {
            name: 'PALAYANGODAGE SAMIPATH YASOMI',
            title: 'Data Analytics',
            contact: '+855 75 201 2316',
            email: 'payasomi@gmail.com',
            image: '/assets/about-us/teams/yasomi.jpg',
            skills: ['HTML', 'Python', 'C++/C#', 'JavaScript', 'VS Code', 'React', 'Hard Working', 'Team Managing', 'Sinhala'],
            projects: []
        },
        {
            name: 'Van Virot',
            title: 'Full-stack developer',
            contact: '+855 71 651 6791',
            email: 'bongloyfo@gmail.com',
            image: '/assets/about-us/teams/virot.jpg',
            skills: ['Laravel', 'PHP', 'Java', 'Javascript and Jquery', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firmware Development', 'Communication', 'Problem-solving', 'Teamwork', 'Quick learner'],
            projects: [
                'Stock management system',
                'Hospital management system',
                'SmartPage Builder',
                'Official website'
            ]
        },
        {
            name: 'PEANG Sereysothirich',
            title: 'Full-Stack Developer & DevOps Engineer',
            contact: '+855 10 460 407',
            email: 'sothirich.p@yorkmars.com',
            image: '/assets/about-us/teams/rich.jpg',
            skills: ['Laravel', 'PHP', 'NodeJS', 'MongoDB', 'Java & JavaFX', 'Discord Bot', 'Flutter', 'React Native', 'Huawei Cloud', 'AWS', 'Cyber Security', 'Splunk BOTS', 'AI', 'Telegram Bot', 'Sketch 3D', 'DevOps', 'RESTful API', 'GraphQL', 'Machine Learning'],
            projects: [
                'Jan 2025 - Present: Project Manager & Full-Stack Developer on Myelin Technologies (UK)',
                'May 2024 - Present: Full-Stack Developer & DevOps Engineer on YalKH',
                'May 2024 - Present: Full-Stack Developer on G ACC',
                'Nov 2024 - Mar 2025: Full-Stack Developer on COC2025',
                'Feb - Mar 2024: Full-Stack Developer Freelance on Boxify',
                'Jan - Mar 2024: Telegram Bot & API Developer on RetroCompConnect Ecosystem',
                'Oct - Nov 2023: Assembly & Coding on Mini Wheel Robot',
                'Feb - Jun 2023: Project manager & QA Tester on Kasek Digital',
                'May 2022: Project manager on Coffee Shop Management System',
                'Aug - Nov 2022: Mobile App Developer on Derham',
                'Jan 2022: Risk Handler on Student Management System'
            ]
        },
        {
            name: 'Samnang Keo',
            title: 'Lead Mobile Developer',
            contact: '+855 96 798 9019',
            email: 'samnangkeo.lo.23@gmail.com',
            image: '/assets/about-us/teams/samnang.png',
            skills: ['Flutter & Dart', 'Firebase', 'RESTful APIs', 'Git', 'Github/GitLab', 'Android & iOS app deployment'],
            projects: [
                'Yal App (Yorkmars Cambodia)',
                'Anakut Digital (Anakut Digital)'
            ]
        },
        {
            name: 'KOEM Chichhong',
            title: 'Software Engineering',
            contact: '+855 61 361 239',
            email: 'chichhorng.koem@student.cadt.edu.kh',
            image: '/assets/about-us/teams/chhorng.jpg',
            skills: ['Flutter', 'HTML', 'CSS', 'JavaScript', 'MySQL & Database Management', 'C/C++', 'Deployment with DigitalOcean'],
            projects: []
        },
        {
            name: 'CHHANG Mengchhay',
            title: 'Mobile Developer',
            contact: '+855 85 807492',
            email: 'chhayhighlay1232@gmail.com',
            image: '/assets/about-us/teams/chhay.jpg',
            skills: ['Flutter', 'API-LARAVEL', 'DB management', 'AWS', 'JAVA', 'Chinese Calligraphy', 'Chinese Painting'],
            projects: []
        },
        {
            name: 'CHHIM Seangleng',
            title: 'Web Developer',
            contact: '+855 98 594 600',
            email: 'chhimseangleng123@gmail.com',
            image: '/assets/about-us/teams/seangleng.jpg',
            skills: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'Java', 'SQL Server & Project', 'Communication', 'Problem Solving', 'Comprehension', 'Decision Making'],
            projects: []
        }
    ];

    const certificates = [
        { name: 'GK Smart', image: '/assets/about-us/certificates/gk-smart.png' },
        { name: 'MOC', image: '/assets/about-us/certificates/moc.png' },
        { name: 'TAFTAC', image: '/assets/about-us/certificates/taftac.png' }
    ];

    const technologies = [
        { name: 'Yaikh', logo: '/logo.jpg', isLocal: true },
        { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/laravel.svg' },
        { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg' },
        { name: 'React', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg' },
        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg' },
        { name: 'Express', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/express.svg' },
        { name: 'ChatGPT', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg' },
        { 
            name: 'Gemini', 
            logo: 'https://cdn.simpleicons.org/googlegemini' 
          }
          
    ];

    return (
        <div 
            className="fixed inset-0 z-[300] bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col animate-in fade-in duration-300 overflow-hidden"
        >
            {/* Header with Back Button and Home Button */}
            <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between flex-shrink-0">
                <h2 className="text-2xl font-bold text-gray-800">About Us</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                        title="Home"
                    >
                        <img 
                            src="/logo.jpg" 
                            alt="Home" 
                            className="w-full h-full object-cover"
                        />
                    </button>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Back"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-[95vw] mx-auto h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                        
                        {/* Left Side - Certificates */}
                        <div className="lg:col-span-1 space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Certificates</h3>
                            <div className="space-y-4">
                                {certificates.map((cert, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                                        onClick={() => setSelectedCertificate(cert.image)}
                                    >
                                        <div className="p-4">
                                            <img
                                                src={cert.image}
                                                alt={cert.name}
                                                className="w-full h-auto object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        <div className="px-4 pb-3">
                                            <p className="text-sm font-semibold text-gray-700 text-center">{cert.name}</p>
                                            <p className="text-xs text-blue-600 text-center mt-1">Click to view full size</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Center - Flags, Description, and Technologies */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Flags Section */}
                            <div className="flex items-end justify-center gap-4 mb-6">
                                <div className="flex flex-col items-center">
                                    <img
                                        src="https://flagcdn.com/w80/hk.png"
                                        alt="Hong Kong"
                                        className="w-14 h-auto shadow-md rounded"
                                    />
                                    <span className="text-xs text-gray-600 mt-1">Hong Kong</span>
                                </div>
                                <div className="flex flex-col items-center transform translate-y-[-8px]">
                                    <img
                                        src="https://flagcdn.com/w80/kh.png"
                                        alt="Cambodia"
                                        className="w-20 h-auto shadow-lg rounded"
                                    />
                                    <span className="text-xs font-semibold text-gray-700 mt-1">Cambodia</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <img
                                        src="https://flagcdn.com/w80/cn.png"
                                        alt="China"
                                        className="w-14 h-auto shadow-md rounded"
                                    />
                                    <span className="text-xs text-gray-600 mt-1">China</span>
                                </div>
                            </div>

                            {/* Description Boxes */}
                            <div className="space-y-4">
                                {aboutUsContent.map((content, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500"
                                    >
                                        <h4 className="text-lg font-bold text-gray-800 mb-2">{content.language}</h4>
                                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                            {content.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Technologies Section */}
                            <div className="mt-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Technologies</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {technologies.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer border-2 border-transparent hover:border-blue-500"
                                        >
                                            <div className="w-14 h-14 mb-2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2">
                                                {tech.isLocal ? (
                                                    <img
                                                        src={tech.logo}
                                                        alt={tech.name}
                                                        className="w-full h-full object-contain rounded-full"
                                                    />
                                                ) : (
                                                    <img
                                                        src={tech.logo}
                                                        alt={tech.name}
                                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                                        style={{ 
                                                            filter: tech.name === 'ChatGPT' || tech.name === 'Gemini' 
                                                                ? 'none' 
                                                                : 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(222deg) brightness(104%) contrast(97%)'
                                                        }}
                                                        onError={(e) => {
                                                            e.target.style.filter = 'none';
                                                            e.target.src = `https://via.placeholder.com/56x56/4F46E5/FFFFFF?text=${tech.name.charAt(0)}`;
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <span className="text-xs font-semibold text-gray-700 text-center">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Team Members */}
                        <div className="lg:col-span-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Team Members</h3>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Skills</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Projects</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {teamMembers.map((member, index) => {
                                                const isExpanded = expandedMember === index;
                                                return (
                                                    <React.Fragment key={index}>
                                                        <tr 
                                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                                            onClick={() => setExpandedMember(isExpanded ? null : index)}
                                                        >
                                                            <td className="px-3 py-3 whitespace-nowrap">
                                                                <img
                                                                    src={member.image}
                                                                    alt={member.name}
                                                                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                                                    onError={(e) => {
                                                                        e.target.src = 'https://via.placeholder.com/40x40?text=' + member.name.charAt(0);
                                                                    }}
                                                                />
                                                            </td>
                                                            <td className="px-3 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                            </td>
                                                            <td className="px-3 py-3">
                                                                <div className="text-sm text-gray-700">{member.title}</div>
                                                            </td>
                                                            <td className="px-3 py-3">
                                                                <div className="text-xs text-gray-600">
                                                                    <div>{member.contact}</div>
                                                                    <div className="text-blue-600">{member.email}</div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-3">
                                                                <div className="text-xs text-gray-600 max-w-xs">
                                                                    {member.skills.length > 0 ? (
                                                                        <div className="flex flex-wrap gap-1">
                                                                            {member.skills.slice(0, 3).map((skill, i) => (
                                                                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                                                                    {skill}
                                                                                </span>
                                                                            ))}
                                                                            {member.skills.length > 3 && (
                                                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                                                    +{member.skills.length - 3}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-gray-400">-</span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-3">
                                                                <div className="text-xs text-gray-600 max-w-xs">
                                                                    {member.projects.length > 0 ? (
                                                                        <div className="space-y-1">
                                                                            {member.projects.slice(0, 2).map((project, i) => (
                                                                                <div key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                                                                    {project.length > 50 ? project.substring(0, 50) + '...' : project}
                                                                                </div>
                                                                            ))}
                                                                            {member.projects.length > 2 && (
                                                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                                                    +{member.projects.length - 2} more
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-gray-400">-</span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-3">
                                                                {isExpanded ? (
                                                                    <ChevronUp className="w-4 h-4 text-gray-500" />
                                                                ) : (
                                                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                                                )}
                                                            </td>
                                                        </tr>
                                                        {isExpanded && (
                                                            <tr className="bg-gray-50">
                                                                <td colSpan="7" className="px-6 py-4">
                                                                    <div className="space-y-4">
                                                                        {/* All Skills */}
                                                                        {member.skills.length > 0 && (
                                                                            <div>
                                                                                <h4 className="text-sm font-semibold text-gray-800 mb-2">All Skills:</h4>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {member.skills.map((skill, i) => (
                                                                                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                                                                                            {skill}
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        
                                                                        {/* All Projects */}
                                                                        {member.projects.length > 0 && (
                                                                            <div>
                                                                                <h4 className="text-sm font-semibold text-gray-800 mb-2">All Projects:</h4>
                                                                                <div className="space-y-2">
                                                                                    {member.projects.map((project, i) => (
                                                                                        <div key={i} className="px-3 py-2 bg-green-50 border-l-4 border-green-500 rounded text-xs text-gray-700">
                                                                                            {project}
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        
                                                                        {/* Show message if no skills or projects */}
                                                                        {member.skills.length === 0 && member.projects.length === 0 && (
                                                                            <div className="text-sm text-gray-500 italic">
                                                                                No additional information available.
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Image Viewer Modal */}
            {selectedCertificate && (
                <ImageViewer
                    imagePath={selectedCertificate}
                    onClose={() => setSelectedCertificate(null)}
                />
            )}
        </div>
    );
};

export default AboutUs;
