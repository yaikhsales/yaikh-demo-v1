import React from 'react';
import { X } from 'lucide-react';

const AboutUs = ({ onClose }) => {
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

    return (
        <div 
            className="fixed inset-0 z-[300] bg-gray-100 flex flex-col animate-in fade-in duration-300"
        >
            {/* Header with Close Button */}
            <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">About Us</h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close"
                >
                    <X size={24} className="text-gray-600" />
                </button>
            </div>

            {/* Full Screen Content Area */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
                <div className="max-w-4xl mx-auto space-y-6">
                    {aboutUsContent.map((content, index) => (
                        <div
                            key={index}
                            className="bg-green-100 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow"
                            style={{
                                marginLeft: 'auto',
                                maxWidth: '90%',
                                width: 'fit-content',
                                minWidth: '70%'
                            }}
                        >
                            <p className="text-gray-800 leading-relaxed text-base md:text-lg">
                                {content.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

