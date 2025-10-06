export default function PomodoroTutorial() {
    return (
        <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
            <h3 className="text-xl font-bold mb-6">How to use Pomodoro Technique</h3>
            <ol className="space-y-3 text-gray-400">
                <li className="flex gap-3">
                    <span className="text-gray-400">1.</span>
                    <span>Choose a task you want to work on</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-gray-400">2.</span>
                    <span>Set the timer for 25 minutes (one Pomodoro)</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-gray-400">3.</span>
                    <span>Work on the task until the timer rings</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-gray-400">4.</span>
                    <span>Take a 5-minute break</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-gray-400">5.</span>
                    <span>After 4 Pomodoros, take a longer 15-30 minute break</span>
                </li>
            </ol>
        </div>
    )
}