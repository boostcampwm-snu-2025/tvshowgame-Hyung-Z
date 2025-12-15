import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewGame = () => {
  const navigate = useNavigate();

  return (
    // 메인 화면과 유사하게 중앙 배치 및 아래로 살짝 내리는 효과 유지
    <div className="flex-1 flex flex-col items-center justify-center pb-40 px-4">
      
      {/* 메인 화면의 큰 제목은 제거했습니다. */}
      {/* 3. 요소 2개 배치 */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
        
        {/* 요소 1: Random */}
        <button 
          className="flex-1 bg-white p-8 rounded-xl border border-gray-200 shadow-md 
                     hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 group text-left"
          onClick={() => navigate('/generation')} // Generation 페이지로 이동
        >
          <div className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600">
            Random
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            전 범위에서 임의로 <span className="font-semibold text-blue-500">10개의 문제</span>를 구성합니다.
          </p>
        </button>

        {/* 요소 2: Custom */}
        <button 
          className="flex-1 bg-white p-8 rounded-xl border border-gray-200 shadow-md 
                     hover:shadow-xl hover:border-green-500 hover:-translate-y-1 transition-all duration-300 group text-left"
          onClick={() => navigate('/custom')} // Custom 페이지로 이동
        >
          <div className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-600">
            Custom
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            직접 범위나 곡을 선택하여 진행합니다.
          </p>
        </button>
      </div>
    </div>
  );
};

export default NewGame;