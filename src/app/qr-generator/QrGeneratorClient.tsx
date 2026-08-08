"use client";

import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, QrCode, Link2, Type, Wifi, Mail, Phone, Settings, CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

type QrType = "url" | "text" | "wifi" | "email" | "phone";

export default function QrGeneratorClient() {
  const [qrType, setQrType] = useState<QrType>("url");
  const [qrValue, setQrValue] = useState("https://fileflow.com");
  
  // Specific states for different types to build the qrValue
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiEnc, setWifiEnc] = useState("WPA");
  const [emailTo, setEmailTo] = useState("");
  const [phone, setPhone] = useState("");

  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);

  const qrRef = useRef<HTMLDivElement>(null);

  // Update QR value when inputs change
  React.useEffect(() => {
    if (qrType === "url") setQrValue(url || "https://");
    else if (qrType === "text") setQrValue(text || " ");
    else if (qrType === "wifi") setQrValue(`WIFI:S:${wifiSsid};T:${wifiEnc};P:${wifiPass};;`);
    else if (qrType === "email") setQrValue(`mailto:${emailTo}`);
    else if (qrType === "phone") setQrValue(`tel:${phone}`);
  }, [qrType, url, text, wifiSsid, wifiPass, wifiEnc, emailTo, phone]);

  const downloadQR = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Create custom QR codes for URLs, text, Wi-Fi passwords, and more instantly."
      breadcrumbs={[{ label: "Utilities", href: "/tools" }, { label: "QR Generator", href: "/qr-generator" }]}
      faq={[
        { question: "Do these QR codes expire?", answer: "No. The QR codes generated here are static, meaning they encode the information directly into the image pattern. They will never expire." },
        { question: "Is my data sent to a server?", answer: "No. The QR codes are generated entirely within your browser for complete privacy." }
      ]}
      relatedTools={[
        { name: "Password Generator", href: "/password-generator", icon: <CheckCircle2 /> },
        { name: "UUID Generator", href: "/uuid-generator", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Input Panel */}
        <div className="flex-1 glass-card border border-border">
          <h3 className="mb-6 flex items-center gap-2"><Settings size={20} /> Configure QR Code</h3>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <button className={`btn flex-1 min-w-[100px] ${qrType === 'url' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setQrType('url')}>
              <Link2 size={16} /> URL
            </button>
            <button className={`btn flex-1 min-w-[100px] ${qrType === 'text' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setQrType('text')}>
              <Type size={16} /> Text
            </button>
            <button className={`btn flex-1 min-w-[100px] ${qrType === 'wifi' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setQrType('wifi')}>
              <Wifi size={16} /> Wi-Fi
            </button>
            <button className={`btn flex-1 min-w-[100px] ${qrType === 'email' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setQrType('email')}>
              <Mail size={16} /> Email
            </button>
            <button className={`btn flex-1 min-w-[100px] ${qrType === 'phone' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setQrType('phone')}>
              <Phone size={16} /> Phone
            </button>
          </div>

          <div className="mb-8 p-4 bg-background rounded border border-border">
            {qrType === "url" && (
              <div>
                <label className="label">Website URL</label>
                <input type="url" className="input w-full" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
              </div>
            )}
            {qrType === "text" && (
              <div>
                <label className="label">Plain Text</label>
                <textarea className="input w-full" rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text here..."></textarea>
              </div>
            )}
            {qrType === "wifi" && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="label">Network Name (SSID)</label>
                  <input type="text" className="input w-full" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} />
                </div>
                <div>
                  <label className="label">Password</label>
                  <input type="text" className="input w-full" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} />
                </div>
                <div>
                  <label className="label">Encryption</label>
                  <select className="input w-full" value={wifiEnc} onChange={(e) => setWifiEnc(e.target.value)}>
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option>
                  </select>
                </div>
              </div>
            )}
            {qrType === "email" && (
              <div>
                <label className="label">Email Address</label>
                <input type="email" className="input w-full" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} placeholder="hello@example.com" />
              </div>
            )}
            {qrType === "phone" && (
              <div>
                <label className="label">Phone Number</label>
                <input type="tel" className="input w-full" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 8900" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Foreground Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded border border-border" />
                <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="input w-full uppercase" />
              </div>
            </div>
            <div>
              <label className="label">Background Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded border border-border" />
                <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="input w-full uppercase" />
              </div>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="md:w-1/3 flex flex-col items-center justify-center p-8 glass-card border border-border">
          <div className="bg-white p-4 rounded-xl shadow-lg mb-6" ref={qrRef}>
            <QRCodeCanvas 
              value={qrValue || " "} 
              size={size} 
              fgColor={fgColor} 
              bgColor={bgColor} 
              level="H" 
              includeMargin={true}
            />
          </div>
          
          <button className="btn btn-primary w-full max-w-[256px]" onClick={downloadQR}>
            <Download size={18} /> Download PNG
          </button>
        </div>

      </div>
    </ToolLayout>
  );
}
