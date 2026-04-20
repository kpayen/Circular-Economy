import { Search, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Equipment {
  id: number;
  name: string;
  owner: string;
  email?: string;           // add ?
  category: string;
  room: string;
  description: string;
  equipmentType?: string;   // add ?
  department: string;
  borrowingPeriod: string;
  loanDateRange?: string;   // add ?
  availableFrom?: string;   // add ?
  availableTo?: string;     // add ?
  availableForPickup?: boolean; // add ?
  manufacturer: string;
  modelNumber: string;
  purchaseDate: string;
  serialNumber: string;
  associatedMagnet?: string; // add ?
  status: string;
  currentlyLoaned?: boolean;
  loanedBy?: string;
}

function EquipmentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 1,
      name: 'Bruker Neo Console',
      department: 'MRI Lab',
      category: 'Console Equipment',
      status: 'Available',
      owner: 'Dr. James Peterson',
      room: 'Building A, Room 203',
      borrowingPeriod: '2 weeks',
      currentlyLoaned: false,
      description: 'Advanced NMR console for high-field spectroscopy applications',
      manufacturer: 'Bruker Biospin',
      modelNumber: 'AVANCE NEO',
      serialNumber: '123456',
      purchaseDate: 'January 2024',
    },
    {
      id: 2,
      name: 'Power Logger Enclosure',
      department: 'CIMAR',
      category: 'Power Monitoring',
      status: 'In Use',
      owner: 'Malathy Elumalai',
      room: 'C213',
      borrowingPeriod: '1 week',
      currentlyLoaned: true,
      loanedBy: 'Julia Martin',
      description: 'Power logger enclosure for monitoring electrical power consumption',
      manufacturer: 'Designed via Autodessk and 3D printed at the COE',
      modelNumber: ' Custom Design',
      serialNumber: '',
      purchaseDate: 'Designed and Printed Spring 2026',
    },
    {
      id: 3,
      name: 'JECO Amplifier Cabinet',
      department: 'Shared Resources',
      category: 'RF Equipment',
      status: 'Available',
      owner: 'Malathy Elumalai',
      room: 'Building C, Lab 8',
      borrowingPeriod: '3 weeks',
      currentlyLoaned: false,
      description: 'High-power RF amplifier cabinet for magnetic resonance applications',
      manufacturer: 'JECO Electronics',
      modelNumber: 'JEC-2000',
      serialNumber: 'abcdefg',
      purchaseDate: 'March 2024',
    },
    {
      id: 4,
      name: 'Lytron Kodiak Chiller',
      department: 'NMR Lab',
      category: 'Cooling Systems',
      status: 'Available',
      owner: 'Dayna',
      room: 'Building A, Lab 22',
      borrowingPeriod: '2 weeks',
      currentlyLoaned: false,
      description: 'Industrial-grade water chiller for probe cooling and thermal regulation',
      manufacturer: 'Lytron Inc',
      modelNumber: 'Kodiak RC100',
      serialNumber: '1a2b3c4d',
      purchaseDate: 'September 2023',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    room: '',
    equipmentType: '',
    department: '',
    borrowingPeriod: '',
    loanDateRange: '',
    availableFrom: '',
    availableTo: '',
    availableForPickup: false,
    manufacturer: '',
    modelNumber: '',
    purchaseDate: '',
    serialNumber: '',
    associatedMagnet: '',
  });

  const handleAddEquipment = () => {
    if (!formData.name || !formData.email || !formData.room || !formData.equipmentType || !formData.department) {
      alert('Please fill in all required fields');
      return;
    }

    const newEquipment: Equipment = {
      id: Math.max(...equipment.map(e => e.id), 0) + 1,
      ...formData,
      status: 'Available',
      currentlyLoaned: false,
      owner: '',
      category: '',
      description: ''
    };

    setEquipment([...equipment, newEquipment]);
    setFormData({
      name: '',
      email: '',
      room: '',
      equipmentType: '',
      department: '',
      borrowingPeriod: '',
      loanDateRange: '',
      availableFrom: '',
      availableTo: '',
      availableForPickup: false,
      manufacturer: '',
      modelNumber: '',
      purchaseDate: '',
      serialNumber: '',
      associatedMagnet: '',
    });
    setShowModal(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    return status === 'Available' ? 'bg-green-500' : 'bg-yellow-500';
  };

  const getStatusTextColor = (status: string) => {
    return status === 'Available' ? 'text-white' : 'text-gray-800';
  };

  const selectedEquipment = equipment.find(e => e.id === selectedId);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">NHMFL Equipment Sharing Platform</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium">
            Login
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-6">
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search equipment by name, department, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-semibold">Filter by:</span>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 font-medium text-gray-700">
              Department ▼
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 font-medium text-gray-700">
              Category ▼
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 font-medium text-gray-700">
              Availability ▼
            </button>
            <button onClick={() => setShowModal(true)} className="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium">
              + Add Equipment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {equipment.map((equip) => (
            <div key={equip.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex gap-6 mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-500 text-sm">Image</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{equip.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">Department: <span className="text-gray-700">{equip.department}</span></p>
                    <p className="text-sm text-gray-600 mb-3">Category: <span className="text-gray-700">{equip.category}</span></p>

                    <div className="flex items-center justify-between">
                      <span className={`${getStatusColor(equip.status)} ${getStatusTextColor(equip.status)} px-3 py-1 rounded text-sm font-semibold`}>
                        {equip.status}
                      </span>
                      <button
                        onClick={() => setSelectedId(selectedId === equip.id ? null : equip.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded font-medium text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {selectedId === equip.id && (
                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-bold text-gray-900 mb-3">Borrowing Information</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Lender (Contact):</span>
                            <p className="text-gray-900 font-medium">{equip.owner}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Location:</span>
                            <p className="text-gray-900 font-medium">{equip.room}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Typical Borrowing Period:</span>
                            <p className="text-gray-900 font-medium">{equip.borrowingPeriod}</p>
                          </div>
                          {equip.currentlyLoaned && (
                            <div>
                              <span className="text-gray-600">Currently Loaned To:</span>
                              <p className="text-gray-900 font-medium">{equip.loanedBy}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm">
                          Check Availability
                        </button>
                        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded font-medium text-sm">
                          Looking for a new home?
                        </button>
                      </div>

                      <div className="border-t pt-4">
                        <button
                          onClick={() => {
                            const element = document.getElementById(`more-info-${equip.id}`);
                            element?.classList.toggle('hidden');
                          }}
                          className="flex items-center gap-2 w-full font-bold text-gray-900 hover:text-blue-600 text-sm"
                        >
                          <span>More Information</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>

                        <div id={`more-info-${equip.id}`} className="hidden mt-4 space-y-3">
                          <div className="bg-gray-50 p-3 rounded">
                            <span className="text-xs font-semibold text-gray-600 uppercase">Description</span>
                            <p className="text-sm text-gray-900 mt-1">{equip.description}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <span className="text-xs font-semibold text-gray-600 uppercase">Manufacturer</span>
                            <p className="text-sm text-gray-900 mt-1">{equip.manufacturer}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-3 rounded">
                              <span className="text-xs font-semibold text-gray-600 uppercase">Model Number</span>
                              <p className="text-sm text-gray-900 mt-1">{equip.modelNumber}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <span className="text-xs font-semibold text-gray-600 uppercase">Serial Number</span>
                              <p className="text-sm text-gray-900 mt-1">{equip.serialNumber}</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <span className="text-xs font-semibold text-gray-600 uppercase">Purchase Date</span>
                            <p className="text-sm text-gray-900 mt-1">{equip.purchaseDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Equipment</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">1. Equipment Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">2. Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">3. Room/Cubicle Location *</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => handleInputChange('room', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">4. Equipment Type *</label>
                  <input
                    type="text"
                    value={formData.equipmentType}
                    onChange={(e) => handleInputChange('equipmentType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">5. Department Associated with Equipment *</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">6. Borrowing Period (How long you are willing to lend this out for)</label>
                  <input
                    type="text"
                    value={formData.borrowingPeriod}
                    onChange={(e) => handleInputChange('borrowingPeriod', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">7. What is the time period for which this equipment is available for loan?</label>
                  </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available From</label>
                    <input
                      type="date"
                      value={formData.availableFrom}
                      onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available To</label>
                    <input
                      type="date"
                      value={formData.availableTo}
                      onChange={(e) => handleInputChange('availableTo', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">8. Is this equipment available for pickup/new home?</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.availableForPickup}
                        onChange={(e) => handleInputChange('availableForPickup', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes, equipment can be picked up or transferred to new owner</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">9. Manufacturer</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">10. Model Number</label>
                  <input
                    type="text"
                    value={formData.modelNumber}
                    onChange={(e) => handleInputChange('modelNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">11. Purchase Date (if Known)</label>
                  <input
                    type="text"
                    value={formData.purchaseDate}
                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">12. Serial Number?</label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">13. Associated Magnet?</label>
                  <input
                    type="text"
                    value={formData.associatedMagnet}
                    onChange={(e) => handleInputChange('associatedMagnet', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter answer"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEquipment}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium"
                >
                  Add Equipment
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default EquipmentList;
