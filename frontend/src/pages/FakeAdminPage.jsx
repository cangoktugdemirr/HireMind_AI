import React, { useState } from 'react';
import { Terminal, ShieldAlert, Cpu, Network, Lock, Crosshair } from 'lucide-react';

export default function FakeAdminPage() {
  const [accessAttempted, setAccessAttempted] = useState(false);
  const [ipAddress] = useState(`${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);

  const handleAttempt = (e) => {
    e.preventDefault();
    setAccessAttempted(true);
    // Play a faint alarm sound in a real scenario
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-green-500 font-mono relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Cyber/Matrix Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #00ff00 1px, transparent 1px), linear-gradient(to bottom, #00ff00 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black"></div>

      <div className="z-10 w-full max-w-lg">
        {/* Terminal Header */}
        <div className="bg-gray-900 border border-green-800 rounded-t-lg p-3 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-green-500 text-xs font-bold tracking-widest flex items-center gap-2">
            <Lock className="w-3 h-3" /> HIREMIND SECURE MAINFRAME
          </div>
        </div>

        {/* Terminal Body */}
        <div className="bg-black border-x border-b border-green-800 rounded-b-lg p-6 shadow-[0_0_50px_rgba(0,255,0,0.1)] relative">

          {!accessAttempted ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center mb-8">
                <Terminal className="w-16 h-16 text-green-500 mb-4 animate-pulse" />
                <h1 className="text-2xl font-bold text-center tracking-[0.2em] mb-2">ROOT ACCESS REQUIRED</h1>
                <p className="text-green-700 text-xs text-center border-b border-green-800 pb-4 w-full">
                  UNAUTHORIZED ACCESS IS PROHIBITED AND ACTIVELY MONITORED.
                </p>
              </div>

              <form onSubmit={handleAttempt} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-green-600">IDENTIFIER [USER/NODE]:</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-900 border border-green-800 rounded px-3 py-2 text-green-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="sysadmin"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-green-600">ENCRYPTION KEY:</label>
                  <input
                    type="password"
                    required
                    className="w-full bg-gray-900 border border-green-800 rounded px-3 py-2 text-green-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-sans"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-green-900 hover:bg-green-800 text-black font-bold py-3 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <Cpu className="w-4 h-4" /> ESTABLISH CONNECTION
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4 py-8">
              <div className="flex justify-center mb-6">
                <ShieldAlert className="w-20 h-20 text-red-500 animate-bounce" />
              </div>
              <h2 className="text-3xl font-black text-red-500 text-center animate-pulse mb-8 tracking-widest">
                WARNING! SECURITY BREACH DETECTED
              </h2>

              <div className="bg-red-950/30 border border-red-800 p-4 rounded text-red-400 text-sm space-y-2">
                <p className="flex items-center gap-2"><Crosshair className="w-4 h-4" /> TRACING INTRUDER IP...</p>
                <p className="animate-pulse pl-6 text-white font-bold">{ipAddress} [LOGGED]</p>
                <p className="flex items-center gap-2 mt-4"><Network className="w-4 h-4" /> INITIATING COUNTER-MEASURES...</p>
                <p className="pl-6 pt-2">REPORTING TO CYBER SECURITY COMMAND.</p>
              </div>

              <p className="text-center text-red-600 text-xs mt-8">
                THIS TERMINAL HAS BEEN LOCKED. EVIDENCE SECURED.
              </p>
            </div>
          )}

          {/* Glitch Overlay Effect */}
          {accessAttempted && (
            <div className="absolute inset-0 pointer-events-none bg-red-500/10 mix-blend-overlay animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
}
