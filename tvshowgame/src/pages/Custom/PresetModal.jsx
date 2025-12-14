import React from 'react';
import { X, PlayCircle } from 'lucide-react';

const PresetModal = ({ isOpen, onClose, onSelect, presets }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 1. 투명 배경 (외부 클릭 시 닫기) */}
      <div 
        className="fixed inset-0 z-40 cursor-default" 
        onClick={onClose}
      />

      {/* 2. 팝오버 본문 (버튼 바로 아래 위치) */}
      {/* left-0으로 설정하여 버튼의 왼쪽 라인에 맞춤 */}
      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
        
        <div className="flex justify-between items-center p-3 border-b border-gray-100 bg-gray-50">
          <h3 className="text-sm font-bold text-gray-700">추천 플레이리스트</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>

        <ul className="max-h-64 overflow-y-auto">
          {presets.map((preset) => (
            <li 
              key={preset.id}
              onClick={() => {
                onSelect(preset.songs);
                onClose();
              }}
              className="p-3 border-b border-gray-50 hover:bg-blue-50 cursor-pointer group transition-colors flex items-center gap-3"
            >
              <div className="text-blue-500 bg-blue-100 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <PlayCircle size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{preset.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{preset.description}</p>
                <p className="text-xs text-blue-600 mt-1 font-medium">{preset.songs.length}곡 포함</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PresetModal;