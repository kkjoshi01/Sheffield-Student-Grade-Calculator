
import React, { useState } from 'react';
import './App.css';

type Module = { name: string; grade: string; credits: string };

const YEAR_LABELS: Record<number, string[]> = {
  3: ['Year 2', 'Year 3'],
  4: ['Year 2', 'Year 3', 'Year 4'],
};

function App() {
  const [courseLength, setCourseLength] = useState<3 | 4>(3);
  const [modules, setModules] = useState<Record<string, Module[]>>({
    'Year 2': [{ name: '', grade: '', credits: '' }],
    'Year 3': [{ name: '', grade: '', credits: '' }],
    'Year 4': [{ name: '', grade: '', credits: '' }],
  });
  const [activeTab, setActiveTab] = useState<'manual' | 'upload'>('manual');
  const [fileName, setFileName] = useState<string>('');

  // Handle file upload (CSV or JSON)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    // File parsing logic would go here
    // For now, just set the file name
  };

  // Handle module field changes
  const handleModuleChange = (year: string, idx: number, field: keyof Module, value: string) => {
    setModules((prev) => {
      const updated = { ...prev };
      updated[year] = updated[year].map((mod, i) =>
        i === idx ? { ...mod, [field]: value } : mod
      );
      return updated;
    });
  };

  // Add a new module row
  const addModule = (year: string) => {
    setModules((prev) => ({
      ...prev,
      [year]: [...prev[year], { name: '', grade: '', credits: '' }],
    }));
  };

  // Remove a module row
  const removeModule = (year: string, idx: number) => {
    setModules((prev) => {
      const updated = { ...prev };
      updated[year] = updated[year].filter((_, i) => i !== idx);
      return updated;
    });
  };

  // Render module input table for a year
  const renderModuleTable = (year: string) => (
    <div className="module-table">
      <h3>{year}</h3>
      <table>
        <thead>
          <tr>
            <th>Module Name</th>
            <th>Grade (%)</th>
            <th>Credits</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {modules[year].map((mod, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="text"
                  value={mod.name}
                  onChange={e => handleModuleChange(year, idx, 'name', e.target.value)}
                  placeholder="e.g. Algorithms"
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={mod.grade}
                  onChange={e => handleModuleChange(year, idx, 'grade', e.target.value)}
                  placeholder="e.g. 72"
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={mod.credits}
                  onChange={e => handleModuleChange(year, idx, 'credits', e.target.value)}
                  placeholder="e.g. 20"
                />
              </td>
              <td>
                {modules[year].length > 1 && (
                  <button type="button" className="remove-btn" onClick={() => removeModule(year, idx)}>
                    &times;
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="add-btn" onClick={() => addModule(year)}>
        + Add Module
      </button>
    </div>
  );

  // Only show years relevant to course length
  const yearsToShow = YEAR_LABELS[courseLength];

  return (
    <div className="grade-app-container">
      <h1 className="main-title">Sheffield Student Grade Calculator</h1>
      <div className="tab-switcher">
        <button
          className={activeTab === 'manual' ? 'active' : ''}
          onClick={() => setActiveTab('manual')}
        >
          Manual Entry
        </button>
        <button
          className={activeTab === 'upload' ? 'active' : ''}
          onClick={() => setActiveTab('upload')}
        >
          Upload File
        </button>
      </div>

      <div className="course-length-selector">
        <label>Course Length:</label>
        <select
          value={courseLength}
          onChange={e => setCourseLength(Number(e.target.value) as 3 | 4)}
        >
          <option value={3}>3 Years (Years 2 & 3)</option>
          <option value={4}>4 Years (Years 2, 3 & 4)</option>
        </select>
      </div>

      {activeTab === 'manual' ? (
        <div className="manual-entry-section">
          {yearsToShow.map(year => renderModuleTable(year))}
        </div>
      ) : (
        <div className="upload-section">
          <label htmlFor="file-upload" className="file-upload-label">
            {fileName ? `Selected: ${fileName}` : 'Choose CSV or JSON file...'}
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv,.json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => document.getElementById('file-upload')?.click()}
            className="upload-btn"
          >
            Upload File
          </button>
        </div>
      )}

      <div className="actions">
        <button className="submit-btn">Calculate Final Grade</button>
      </div>
    </div>
  );
}

export default App;
