
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Zap, Image as ImageIcon, Briefcase, Plus, Trash2, CheckCircle2, Loader2, ArrowRight, ArrowLeft, Upload } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { COLORS, SPRING_CONFIG } from '../../constants';
import { StationOnboarding } from '../../services/AdminService';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    locality: '',
    lat: 17.4483,
    lng: 78.3489,
    phone: '',
    about: '',
    vendor_id: '1',
    chargers: [{ type_id: '1', voltage_id: '1', power: '60' }],
    images: [] as { file: File; type: string; preview: string }[]
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const addCharger = () => {
    setFormData(prev => ({
      ...prev,
      chargers: [...prev.chargers, { type_id: '1', voltage_id: '1', power: '60' }]
    }));
  };

  const removeCharger = (index: number) => {
    setFormData(prev => ({
      ...prev,
      chargers: prev.chargers.filter((_, i) => i !== index)
    }));
  };

  const updateCharger = (index: number, field: string, value: string) => {
    const newChargers = [...formData.chargers];
    (newChargers[index] as any)[field] = value;
    setFormData({ ...formData, chargers: newChargers });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Cast file to File to fix 'unknown' type error for URL.createObjectURL
      const newImages = Array.from(files).map((file: any) => ({
        file: file as File,
        type: 'primary',
        preview: URL.createObjectURL(file as File)
      }));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    }
  };

  const updateImageType = (index: number, type: string) => {
    const newImages = [...formData.images];
    newImages[index].type = type;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Temporary token for demonstration based on the provided curl
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RhcmtncmF5LWJ1dHRlcmZseS05MTY2ODYuaG9zdGluZ2Vyc2l0ZS5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNzcwNDU1NzYwLCJleHAiOjE3NzA0NTkzNjAsIm5iZiI6MTc3MDQ1NTc2MCwianRpIjoielpMeUtkRGt6YmtVNkhRMiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZXMiOlsic3VwZXItYWRtaW4iXSwicGVybWlzc2lvbnMiOltdfQ.gEmDFTYy2C3Yo2DqFzeqLKmhu-5PFCxANZpwrLAO2Dg';
      await StationOnboarding(formData, token);
      setSuccess(true);
      setTimeout(onClose, 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  // Map Component Helper
  const LocationPicker = () => {
    const map = useMapEvents({
      click(e) {
        setFormData(prev => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng }));
      },
    });
    return (
      <Marker 
        position={[formData.lat, formData.lng]} 
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const position = marker.getLatLng();
            setFormData(prev => ({ ...prev, lat: position.lat, lng: position.lng }));
          },
        }}
      />
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[48px] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2 className="text-3xl font-black text-[#0D1E3A] tracking-tighter" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Host a <span className="text-[#1DB954]">Hub.</span>
            </h2>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#1DB954]' : 'bg-gray-100'}`} />
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-10 scroll-hide">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-6">
              <div className="w-24 h-24 bg-[#1DB954] text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-[#1DB954]/20 animate-bounce">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-4xl font-black text-[#0D1E3A] tracking-tighter">Onboarding Complete.</h3>
              <p className="text-gray-400 font-medium max-w-md">Your hub is now being verified by the Plugzo grid intelligence. You will appear live within 24 hours.</p>
            </div>
          ) : (
            <>
              {/* STEP 1: IDENTITY & LOCATION */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Station Name" value={formData.name} onChange={v => setFormData({ ...formData, name: v })} placeholder="e.g. NearVolt Gachibowli Hub" />
                    <InputGroup label="Locality" value={formData.locality} onChange={v => setFormData({ ...formData, locality: v })} placeholder="e.g. Indiranagar" />
                    <div className="md:col-span-2">
                      <InputGroup label="Full Address" value={formData.address} onChange={v => setFormData({ ...formData, address: v })} placeholder="Complete street address..." />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Pin Location on Grid</label>
                      <div className="flex gap-4">
                        <span className="text-[10px] font-bold text-[#1DB954]">LAT: {formData.lat.toFixed(6)}</span>
                        <span className="text-[10px] font-bold text-[#1DB954]">LNG: {formData.lng.toFixed(6)}</span>
                      </div>
                    </div>
                    <div className="h-[300px] rounded-[32px] overflow-hidden border-2 border-gray-50 bg-gray-50">
                      <MapContainer center={[17.4483, 78.3489]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationPicker />
                      </MapContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CHARGER CONFIG */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black text-[#0D1E3A]">Charger Inventory</h3>
                    <button onClick={addCharger} className="flex items-center gap-2 px-5 py-2 bg-[#1DB954] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                      <Plus size={14} /> Add Charger
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.chargers.map((charger, idx) => (
                      <div key={idx} className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-wrap items-end gap-6 relative group">
                        <div className="flex-1 min-w-[150px]">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-2">Type</label>
                           <select 
                            value={charger.type_id}
                            onChange={(e) => updateCharger(idx, 'type_id', e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none"
                           >
                              <option value="1">Type 2 (AC)</option>
                              <option value="2">CCS2 (DC Fast)</option>
                              <option value="3">CHAdeMO</option>
                           </select>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-2">Voltage</label>
                           <select 
                            value={charger.voltage_id}
                            onChange={(e) => updateCharger(idx, 'voltage_id', e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none"
                           >
                              <option value="1">Level 2 (240V)</option>
                              <option value="2">DC High Voltage (400V+)</option>
                           </select>
                        </div>
                        <div className="w-24">
                           <InputGroup label="kW" value={charger.power} onChange={v => updateCharger(idx, 'power', v)} placeholder="60" />
                        </div>
                        {formData.chargers.length > 1 && (
                          <button onClick={() => removeCharger(idx)} className="p-3 text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: MEDIA */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="border-2 border-dashed border-gray-100 rounded-[40px] p-12 text-center bg-gray-50/50 hover:bg-[#F4FFF8] hover:border-[#1DB954]/20 transition-all group relative">
                    <input type="file" multiple onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-gray-300 group-hover:text-[#1DB954] transition-colors mb-4">
                      <Upload size={32} />
                    </div>
                    <p className="text-lg font-black text-[#0D1E3A]">Drag Hub Imagery</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Max 5MB per file • JPG, PNG</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group rounded-3xl overflow-hidden border border-gray-100 bg-white">
                        <img src={img.preview} alt="Preview" className="w-full h-32 object-cover" />
                        <div className="p-3">
                          <select 
                            value={img.type}
                            onChange={(e) => updateImageType(idx, e.target.value)}
                            className="w-full text-[10px] font-black uppercase tracking-widest bg-gray-50 rounded-lg px-2 py-1.5 focus:outline-none"
                          >
                            <option value="primary">Primary View</option>
                            <option value="entrance">Hub Entrance</option>
                            <option value="exterior">Street View</option>
                            <option value="plug">Hardware Close-up</option>
                          </select>
                        </div>
                        <button 
                          onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: META */}
              {step === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Primary Phone" value={formData.phone} onChange={v => setFormData({ ...formData, phone: v })} placeholder="+91 00000 00000" />
                    <InputGroup label="Vendor ID" value={formData.vendor_id} onChange={v => setFormData({ ...formData, vendor_id: v })} placeholder="Admin Assigned ID" />
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-3">About the Hub</label>
                      <textarea 
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                        placeholder="Briefly describe the amenities and secure access instructions..."
                        className="w-full min-h-[150px] bg-gray-50 border border-gray-100 rounded-[32px] p-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#1DB954]/5 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!success && (
          <div className="px-10 py-8 border-t border-gray-50 bg-gray-50/50 flex justify-between items-center">
            {step > 1 ? (
              <button onClick={handleBack} className="flex items-center gap-2 px-8 py-4 text-[#0D1E3A] font-black text-[11px] uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
                <ArrowLeft size={18} /> Previous Step
              </button>
            ) : <div />}

            <button 
              onClick={step === 4 ? handleSubmit : handleNext}
              disabled={loading}
              className="px-10 py-4 bg-[#0D1E3A] text-white rounded-[20px] font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl shadow-[#0D1E3A]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (step === 4 ? 'Initiate Grid Sync' : 'Proceed to Hardware')}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder: string }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{label}</label>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#1DB954]/5 transition-all placeholder:text-gray-300"
    />
  </div>
);

export default RegistrationModal;
