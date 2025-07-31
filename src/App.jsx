
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GatePrepApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [forgetList, setForgetList] = useState([]);
  const [forgetItem, setForgetItem] = useState("");
  const [newPoints, setNewPoints] = useState([]);
  const [point, setPoint] = useState("");
  const [monthlyTarget, setMonthlyTarget] = useState([]);
  const [target, setTarget] = useState("");

  const addItem = (listSetter, item, itemSetter) => {
    listSetter(prev => [...prev, item]);
    itemSetter("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800 drop-shadow">GATE Prep Companion</h1>

      <Tabs defaultValue="tasks" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-6 bg-white shadow rounded">
          <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
          <TabsTrigger value="alarm">Wake Alarm</TabsTrigger>
          <TabsTrigger value="timer">Practice Timer</TabsTrigger>
          <TabsTrigger value="forget">Forget List</TabsTrigger>
          <TabsTrigger value="points">New Points</TabsTrigger>
          <TabsTrigger value="targets">Monthly Targets</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <Card className="mt-4">
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input value={task} onChange={e => setTask(e.target.value)} placeholder="Write your task" />
                  <Button onClick={() => addItem(setTasks, task, setTask)}>Add</Button>
                </div>
                <ul className="list-disc pl-5">
                  {tasks.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alarm">
          <Card className="mt-4">
            <CardContent>
              <p className="text-lg">Set a browser notification alarm with audio. (Cannot bypass OS-level mute restrictions)</p>
              <Button onClick={() => alert("Wake up! Start your day strong.")}>Test Alarm</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timer">
          <Card className="mt-4">
            <CardContent>
              <Timer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forget">
          <Card className="mt-4">
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input value={forgetItem} onChange={e => setForgetItem(e.target.value)} placeholder="What are you forgetting?" />
                  <Button onClick={() => addItem(setForgetList, forgetItem, setForgetItem)}>Add</Button>
                </div>
                <ul className="list-disc pl-5">
                  {forgetList.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="points">
          <Card className="mt-4">
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input value={point} onChange={e => setPoint(e.target.value)} placeholder="New concept or shortcut" />
                  <Button onClick={() => addItem(setNewPoints, point, setPoint)}>Add</Button>
                </div>
                <ul className="list-disc pl-5">
                  {newPoints.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets">
          <Card className="mt-4">
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input value={target} onChange={e => setTarget(e.target.value)} placeholder="Write monthly target" />
                  <Button onClick={() => addItem(setMonthlyTarget, target, setTarget)}>Add</Button>
                </div>
                <ul className="list-disc pl-5">
                  {monthlyTarget.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-10 text-center text-sm text-gray-500">Made for Aditya’s Ultimate GATE Prep Journey 🚀</div>
    </div>
  );
}

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const toggle = () => setActive(!active);

  React.useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (!active && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="text-center space-y-2">
      <div className="text-4xl font-bold">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</div>
      <Button onClick={toggle}>{active ? "Pause" : "Start"}</Button>
      <Button onClick={() => setSeconds(0)}>Reset</Button>
    </div>
  );
}
