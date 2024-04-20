using AutoMapper;
using diversitytracker.api.Contracts;
using diversitytracker.api.Controllers;
using Moq;

namespace diversitytracker.api.tests;

public class FormsControllerTests
{
    private readonly Mock<IMapper> _mockMapper;
    private readonly Mock<IFormsRepository> _mockFormsRepository;
    private readonly FormsController _controller;

    public FormsControllerTests()
    {
        _mockMapper = new Mock<IMapper>();
        _mockFormsRepository = new Mock<IFormsRepository>();
        _controller = new FormsController(_mockMapper.Object, _mockFormsRepository.Object);
    }

    
}