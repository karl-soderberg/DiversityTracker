// using AutoMapper;
// using diversitytracker.api.Contracts;
// using diversitytracker.api.Controllers;
// using diversitytracker.api.Models;
// using diversitytracker.api.Models.Forms;
// using diversitytracker.api.Enums;
// using FluentAssertions;
// using Microsoft.AspNetCore.Mvc;
// using Moq;

// namespace diversitytracker.api.tests
// {
//     public class FormsControllerUnitTests
//     {
//         private readonly Mock<IMapper> _mockMapper;
//         private readonly Mock<IFormsRepository> _mockFormsRepository;
//         private readonly FormsDataController _controller;

//         public FormsControllerUnitTests()
//         {
//             _mockMapper = new Mock<IMapper>();
//             _mockFormsRepository = new Mock<IFormsRepository>();
//             _controller = new FormsDataController(_mockMapper.Object, _mockFormsRepository.Object);
//         }

//         [Fact]
//         public async Task GetFormsReturnsOk()
//         {
//             // Arrange
//             var formsData = new List<BaseForm>
//             {
//                 new BaseForm { Id = 1, QuestionType = QuestionType.leadership, value = 5, Description = "Leadership quality insights" },
//                 new BaseForm { Id = 2, QuestionType = QuestionType.represented, value = 10, Description = "Representation in upper management" }
//             };
//             var formsResponseData = new List<BaseFormResponseDto>
//             {
//                 new BaseFormResponseDto { QuestionType = QuestionType.leadership, value = 5, Description = "Leadership quality insights" },
//                 new BaseFormResponseDto { QuestionType = QuestionType.represented, value = 10, Description = "Representation in upper management" }
//             };

//             _mockFormsRepository.Setup(repo => repo.GetFormsAsync()).ReturnsAsync(formsData);
//             _mockMapper.Setup(mapper => mapper.Map<IEnumerable<BaseFormResponseDto>>(formsData)).Returns(formsResponseData);

//             // Act
//             var result = await _controller.GetFormResults();

//             // Assert
//             var actionResult = result.Result as OkObjectResult;
//             actionResult.Should().NotBeNull();
//             actionResult.StatusCode.Should().Be(200);
//         }

//         [Fact]
//         public async Task AddFormReturnsCreatedAtActionResult()
//         {
//             // Arrange
//             var baseFormRequestDto = new BaseFormRequestDto { QuestionType = QuestionType.represented, value = 20, Description = "Diversity in tech roles" };
//             var newForm = new BaseForm { Id = 3, QuestionType = QuestionType.represented, value = 20, Description = "Diversity in tech roles" };

//             _mockMapper.Setup(m => m.Map<BaseForm>(baseFormRequestDto)).Returns(newForm);
//             _mockFormsRepository.Setup(repo => repo.AddFormAsync(newForm)).Returns(Task.FromResult(new BaseForm { Id = 3, QuestionType = QuestionType.represented, value = 20, Description = "Diversity in tech roles" }));

//             // Act
//             var result = await _controller.AddForm(baseFormRequestDto);

//             // Assert
//             var createdAtActionResult = result as CreatedAtActionResult;
//             createdAtActionResult.Should().NotBeNull();
//             createdAtActionResult.StatusCode.Should().Be(201);
//             createdAtActionResult.ActionName.Should().Be(nameof(FormsController.GetFormResults));
//             createdAtActionResult.Value.Should().BeEquivalentTo(newForm);
//         }
//     }
// }
