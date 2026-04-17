import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError(null)
    setData(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/decrypt', {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'SYSTEM_FAILURE_DETECTED')
      }
      
      setData(result.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>[ DECRYPT_PAYLOAD_SYSTEM ]</h1>
      
      <form onSubmit={handleUpload}>
        <div className="upload-box">
          <label className="custom-file-upload">
            <input 
              type="file" 
              accept=".jsonl" 
              onChange={handleFileChange} 
            />
            {file ? `[ ${file.name} ]` : 'SELECT_ENCRYPTED_FILE'}
          </label>
          <br />
          <button className="btn-submit" type="submit" disabled={!file || loading}>
            {loading ? 'BRUTE_FORCING...' : 'EXECUTE_DECRYPT'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-msg">
          <strong>[ ERR ]</strong> {error}
        </div>
      )}

      {data && (
        <div className="terminal-window">
          <div className="terminal-header">
            <span>root@system:~/decrypted_data</span>
            <span>[{data.length}_RECORDS_FOUND]</span>
          </div>
          <div className="terminal-body">
            <pre>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default App