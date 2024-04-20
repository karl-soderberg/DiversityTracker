using diversitytracker.api.Repository;
using diversitytracker.api.Models;
using FluentAssertions;
using diversitytracker.api.Enums;

public class FormsRepositoryTests : IClassFixture<DatabaseFixture>
{
    private readonly FormsRepository _repository;
    private readonly DatabaseFixture _fixture;

    public FormsRepositoryTests(DatabaseFixture fixture)
    {
        _fixture = fixture;
        _repository = new FormsRepository(fixture.DbContext);
    }

    [Fact]
    public async Task AddFormAsyncAddsDataCorrectly()
    {
        // Arrange
        var newForm = new BaseForm { QuestionType = QuestionType.leadership, value = 10, Description = "Test Description" };

        // Act
        var baseCount = await _repository.GetFormsAsync();
        var result = await _repository.AddFormAsync(newForm);

        // Assert
        result.Should().NotBeNull();
        result.Id.Should().Be(baseCount.Count + 1);
        _fixture.DbContext.BaseFormsData.Count().Should().Be(baseCount.Count + 1);
    }
}