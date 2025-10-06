import React from "react";

const PomodoroSettings = ({
    workDuration,
    breakDuration,
    setWorkDuration,
    setBreakDuration,
    showSettings,
    setShowSettings,
    onSave
}) => {
    if (!showSettings) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
            <div className="bg-zinc-800 border border-zinc-700 gap-4 p-5 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Pomodoro Settings</h2>

                {/* Work session */}
                <label className="block my-4">Work Duration:</label>
                <div className="grid grid-cols-4 gap-2 mb-4">
                    <input
                        type="number"
                        min="0"
                        value={Math.floor(workDuration / 60)}
                        onChange={(e) =>
                            setWorkDuration((prev) => +e.target.value * 60 + (prev % 60))
                        }
                        className="border px-2 py-1 rounded col-span-3"
                    />{" "}
                    <p className="mt-1 mr-2">mins.</p>
                    {/* <input
                        type="number"
                        min="0"
                        max="59"
                        value={workDuration % 60}
                        onChange={(e) =>
                            setWorkDuration(Math.floor(workDuration / 60) * 60 + +e.target.value)
                        }
                        className="w-20 border px-2 py-1 rounded"
                    />{" "}
                    <p className="mt-1">sec</p> */}
                </div>

                {/* Break session */}
                <label className="block my-4">Break Duration:</label>
                <div className="grid grid-cols-4 gap-2 mb-8">
                    <input
                        type="number"
                        min="0"
                        value={Math.floor(breakDuration / 60)}
                        onChange={(e) =>
                            setBreakDuration((prev) => + e.target.value * 60 + (prev % 60))
                        }
                        className=" border px-2 py-1 rounded col-span-3"
                    />{" "}
                    <p className="mt-1 mr-2">mins.</p>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowSettings(false)}
                        className="px-3 py-1 bg-zinc-700 border border-zinc-600 rounded hover:bg-zinc-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave();
                            setShowSettings(false);
                        }}
                        className="px-6 py-1 bg-emerald-700 text-white rounded hover:bg-emerald-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PomodoroSettings;
